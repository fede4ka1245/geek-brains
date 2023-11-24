import whisper

sr_model = whisper.load_model("medium")


def get_text(filepath):
    return sr_model.transcribe(filepath, language="ru", prompt="The sentence may be cut off, do not make up words to fill in the rest of the sentence.")


def format_seconds(seconds_count):
    return f"{int(seconds_count // 3600)}:{int(seconds_count / 60 % 60 // 1)}:{seconds_count % 60}"\
        .replace(".", ",")


def save_srt_file(result, filename):
    segments = result["segments"]
    data = []
    for segment in segments:
        data.append(
            f"{segment['id']}\n{format_seconds(segment['start'])} --> {format_seconds(segment['end'])}\n{segment['text']}")

    with open(f"r{filename}.srt", mode="w") as f:
        f.write("\n\n".join(data))


def save_txt_file(result, filename):
    with open(filename, mode="w") as f:
        f.write(result["text"])
