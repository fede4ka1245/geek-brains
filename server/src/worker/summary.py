from io import BytesIO

from botocore.client import BaseClient

from config import S3_AUDIO_BUCKET
from src.ml.summary import get_summary
from src.models import Upload


def generate_summary(db_session, s3: BaseClient, upload_id: int):
    upload = db_session.query(Upload).get(upload_id)
    try:
        bytes_buffer = BytesIO()
        s3.download_fileobj(Bucket=S3_AUDIO_BUCKET, Key=upload.get_transcription_file_key(), Fileobj=bytes_buffer)
        byte_value = bytes_buffer.getvalue()
        text = byte_value.decode()

        data = get_summary(text)
        s3.put_object(Body=data.encode("utf8"), Bucket=S3_AUDIO_BUCKET, Key=upload.get_summary_file_key())
    except Exception as error:
        print(f"upload with id: {upload_id} died during making summary, exception: {error}")
        upload.state = "died"
    else:
        upload.state = "summary"
    finally:
        db_session.commit()
