import torch
from peft import PeftModel, PeftConfig
from transformers import AutoModelForCausalLM, AutoTokenizer, GenerationConfig

MODEL_NAME = "IlyaGusev/saiga_7b_lora"
DEFAULT_MESSAGE_TEMPLATE = "<s>{role}\n{content}</s>"
DEFAULT_RESPONSE_TEMPLATE = "<s>bot\n"
DEFAULT_SYSTEM_PROMPT = "Ты — Сайга, русскоязычный автоматический ассистент. Ты разговариваешь с людьми и помогаешь им."


class Conversation:
    def __init__(
        self,
        message_template=DEFAULT_MESSAGE_TEMPLATE,
        system_prompt=DEFAULT_SYSTEM_PROMPT,
        response_template=DEFAULT_RESPONSE_TEMPLATE
    ):
        self.message_template = message_template
        self.response_template = response_template
        self.messages = [{
            "role": "system",
            "content": system_prompt
        }]

    def add_user_message(self, message):
        self.messages.append({
            "role": "user",
            "content": message
        })

    def add_bot_message(self, message):
        self.messages.append({
            "role": "bot",
            "content": message
        })

    def get_prompt(self, tokenizer):
        final_text = ""
        for message in self.messages:
            message_text = self.message_template.format(**message)
            final_text += message_text
        final_text += DEFAULT_RESPONSE_TEMPLATE
        return final_text.strip()


def generate(model, tokenizer, prompt, generation_config):
    data = tokenizer(prompt, return_tensors="pt", add_special_tokens=False)
    data = {k: v.to(model.device) for k, v in data.items()}
    output_ids = model.generate(
        **data,
        generation_config=generation_config
    )[0]
    output_ids = output_ids[len(data["input_ids"][0]):]
    output = tokenizer.decode(output_ids, skip_special_tokens=True)
    return output.strip()


config = PeftConfig.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(
    config.base_model_name_or_path,
    torch_dtype=torch.float16,
    device_map="auto"
)
model = PeftModel.from_pretrained(
    model,
    MODEL_NAME,
    torch_dtype=torch.float16
)
model.eval()

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=False)
generation_config = GenerationConfig.from_pretrained(MODEL_NAME)
generation_config.temperature = 0.01


def get_summary(text: str):
    text = text.replace("!", '.').replace('?', '.')
    lines = text.split('.')

    inputs = []
    i = 0
    j = 0
    while i < len(lines):
        i += 30
        while len(lines[j:i]) > 4000:
            i -= 1
        inputs.append(".".join(lines[j:i]))
        j = i

    inp = '''Представьте, что вы провели урок. Теперь вам нужно рассказать студентам о нем в виде короткого текста. Не забудьте указать зачем изучать этот урок, какую пользу он принесет, какие знания получит студент и на что они повлияют.
    Начало вашего урока: '''
    inp = inp + inputs[0]
    inp += '''
    Тема урока: '''
    conversation = Conversation()
    conversation.add_user_message(inp)
    prompt = conversation.get_prompt(tokenizer)

    part1 = generate(model, tokenizer, prompt, generation_config)

    inp = '''Представьте, что вы провели урок. Теперь вам нужно составить краткий план этого урока. 
    Начало вашего урока: '''
    if len(inputs[0] + inputs[1]) < 6001:
        inp = inp + inputs[0] + inputs[1]
    else:
        inp = inp + (inputs[0] + inputs[1])[:6000]
    inp += '''
    1. '''
    conversation = Conversation()
    conversation.add_user_message(inp)
    prompt = conversation.get_prompt(tokenizer)

    part2 = generate(model, tokenizer, prompt, generation_config)

    inp = '''Представьте, что вы провели урок. Теперь вам нужно тезисно написать список ключевых выводов (главных мыслей, инсайтов, главных правил — всего того, что относится к ЗНАНИЯМ, которые получили студенты на уроке).

    Окончание вашего урока: '''
    if len(inputs[-2] + inputs[-1]) < 6001:
        inp = inp + inputs[-2] + inputs[-1]
    else:
        inp = inp + (inputs[-2] + inputs[-1])[-6000:]
    conversation = Conversation()
    conversation.add_user_message(inp)
    prompt = conversation.get_prompt(tokenizer)

    part4 = generate(model, tokenizer, prompt, generation_config)

    inp = '''

    Продолжи фразу по тексту: "Теперь вы знаете, как ..."'''
    if len(inputs[-2] + inputs[-1]) < 6001:
        inp = inputs[-2] + inputs[-1] + inp
    else:
        inp = (inputs[-2] + inputs[-1])[-6000:] + inp
    conversation = Conversation()
    conversation.add_user_message(inp)
    prompt = conversation.get_prompt(tokenizer)

    part5 = generate(model, tokenizer, prompt, generation_config)

    lesson_name = part1.split('\n')[0]
    plan = ''

    for i in part2.split('\n'):
        if i:
            if i[0].isdigit():
                plan += i + '\n'
    if plan:
        plan = plan[:-1]
    else:
        plan = part2

    main_tesis = ''
    for i in part4.split('\n'):
        if i:
            if i[0].isdigit():
                main_tesis += i + '\n'
    if main_tesis:
        main_tesis = main_tesis[:-1]
    else:
        main_tesis = part4

    final = part5.split('\n')[0]

    lesson_conspect = ""
    lesson_conspect = lesson_conspect + lesson_name.upper() + '\n\n' + 'Введение' '\n'
    for x in part1.split('\n')[1:]:
        if x:
            lesson_conspect = lesson_conspect + x + '\n'
    lesson_conspect = lesson_conspect + '\n' + 'План урока' + '\n' + plan + '\n\n'
    lesson_conspect = lesson_conspect + 'Контент\n\n' + 'Выводы\n' + main_tesis + '\n\n' + 'Заключение\n' + final

    return lesson_conspect
