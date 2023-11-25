import tempfile

from botocore.client import BaseClient

from config import S3_AUDIO_BUCKET
from src.models import Upload
from src.ml.transcription import get_text


def generate_transcription(db_session, s3: BaseClient, upload_id: int):
    upload = db_session.query(Upload).get(upload_id)

    try:
        with tempfile.NamedTemporaryFile() as tmp:
            s3.download_file(Filename=tmp.name, Bucket=S3_AUDIO_BUCKET, Key=upload.get_audio_file_key())
            transcription = get_text(tmp.name)
        s3.put_object(Body=transcription["text"].encode("utf8"), Bucket=S3_AUDIO_BUCKET, Key=upload.get_transcription_file_key())

        data = []
        for segment in transcription["segments"]:
            data.append(
                f"{segment['id']}\n{format_seconds(segment['start'])} --> {format_seconds(segment['end'])}\n{segment['text']}")

        data = "\n\n".join(data).replace("С вами был Игорь Негода.", "")
        s3.put_object(Body=data.encode("utf8"), Bucket=S3_AUDIO_BUCKET, Key=upload.get_srt_file_key())
    except Exception as error:
        print(f"upload with id: {upload_id} died during transcriptioning, exception: {error}")
        upload.state = "died"
    else:
        upload.state = "transcription"
    finally:
        db_session.commit()


def format_seconds(seconds_count):
  return f"{int(seconds_count // 3600)}:{int(seconds_count / 60 % 60 // 1)}:{seconds_count % 60}".replace(".", ",")