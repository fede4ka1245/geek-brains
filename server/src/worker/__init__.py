from time import sleep

from botocore.client import BaseClient

from config import NO_UPLOADS_TO_PROCESS_DELAY
from src.models import Upload

from .transcription import generate_transcription
from .terms import generate_terms
from .summary import generate_summary


INPROCESSABLE_STATES = ["created", "terms", "died"]


def main(db_session, s3: BaseClient):
    while True:
        upload_to_process = db_session.query(Upload).filter(Upload.state.notin_(INPROCESSABLE_STATES)).first()

        if upload_to_process is None:
            print("No uploads to process")
            sleep(NO_UPLOADS_TO_PROCESS_DELAY)
            continue

        match upload_to_process.state:
            case "audio":
                print(f"Generating transcription for upload with {upload_to_process.id}")
                generate_transcription(db_session, s3, upload_to_process.id)
            case "transcription":
                print(f"Generating summary for upload with {upload_to_process.id}")
                generate_summary(db_session, s3, upload_to_process.id)
            case "summary":
                print(f"Generating terms for upload with {upload_to_process.id}")
                generate_terms(db_session, s3, upload_to_process.id)
            case _:
                print(f"Warning: unknown state \"{upload_to_process.state}\" of upload with id {upload_to_process.id}")

