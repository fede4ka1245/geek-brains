from io import BytesIO

from botocore.client import BaseClient

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
                term = term.strip('*')
                if 4 <= len(term) <= 30 and term.lower() not in terminology:
                    # terminology[term.lower()] = definition.rstrip('.')
                    terms.append(Term(upload_id=upload_id, name=term.lower(), definition=definition.rstrip('.'), time_start="", time_end=""))
                    terminology.add(term.lower())

        db_session.add_all(terms)
        db_session.commit()

    except Exception as error:
        print(f"upload with id: {upload_id} died during generating terms, exception: {error}")
        upload.state = "died"
    else:
        upload.state = "terms"
    finally:
        db_session.commit()
