from io import BytesIO

from botocore.client import BaseClient

from srt import parse as srt_parse, Subtitle

from config import S3_AUDIO_BUCKET
from src.ml.terms import get_terms
from src.models import Upload, Term


def generate_terms(db_session, s3: BaseClient, upload_id: int):
    upload = db_session.query(Upload).get(upload_id)

    try:
        bytes_buffer = BytesIO()
        s3.download_fileobj(Bucket=S3_AUDIO_BUCKET, Key=upload.get_transcription_file_key(), Fileobj=bytes_buffer)
        byte_value = bytes_buffer.getvalue()
        text = byte_value.decode()

        bytes_buffer = BytesIO()
        s3.download_fileobj(Bucket=S3_AUDIO_BUCKET, Key=upload.get_srt_file_key(), Fileobj=bytes_buffer)
        byte_value = bytes_buffer.getvalue()
        srt_file_text = byte_value.decode()

        subtitles: list[Subtitle] = srt_parse(srt_file_text)
        max_time = max(map(lambda subtitle: subtitle.end, subtitles))

        terms = list[Term]()

        poor_symbols = [*[str(x) + '. ' for x in range(20)], '- ']
        terminology = set[str]()
        for output in get_terms(text):
            for term in output.split('\n'):
                if len(term) == 0 or ' - ' not in term:
                    continue

                for symb in poor_symbols:
                    term = term.lstrip(symb)

                term, definition = term.split(' - ', maxsplit=1)
                term = term.strip('*').lower()
                if 4 <= len(term) <= 30 and term not in terminology:
                    time_start, time_end = "", ""
                    for subtitle in subtitles:
                        if subtitle.content.lower().count(term) > 0:
                            time_start, time_end = str(subtitle.start), str(subtitle.end)
                            break
                    else:
                        time_start, time_end = "00:00", str(max_time)

                    terms.append(Term(upload_id=upload_id, name=term, definition=definition.rstrip('.'), time_start=time_start, time_end=time_end))
                    terminology.add(term)

        db_session.add_all(terms)
        db_session.commit()

    except Exception as error:
        print(f"upload with id: {upload_id} died during generating terms, exception: {error}")
        upload.state = "died"
    else:
        upload.state = "terms"
    finally:
        db_session.commit()
