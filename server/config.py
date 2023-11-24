from os import getenv
from dotenv import load_dotenv

load_dotenv()

DATABASE_CONNECTION_STR = getenv("DATABASE_CONNECTION_STR")

S3_ENDPOINT_URL = getenv("S3_ENDPOINT_URL")

S3_ACCESS_KEY = getenv("S3_ACCESS_KEY")
S3_SECRET_KEY = getenv("S3_SECRET_KEY")
S3_AUDIO_BUCKET = getenv("S3_AUDIO_BUCKET")
S3_REGION_NAME = getenv("S3_REGION_NAME")

NO_UPLOADS_TO_PROCESS_DELAY = getenv("NO_UPLOADS_TO_PROCESS_DELAY")

WHISPER_MODEL = "medium"


import boto3
from botocore.config import Config

s3 = boto3.client(
    service_name="s3",
    aws_access_key_id=S3_ACCESS_KEY,
    aws_secret_access_key=S3_SECRET_KEY,
    region_name=S3_REGION_NAME,
    endpoint_url=S3_ENDPOINT_URL,
    config=Config(s3={"addressing_style": "path"})
)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.models import Base

engine = create_engine(DATABASE_CONNECTION_STR)
make_db_session = sessionmaker(autoflush=False, bind=engine)
db_session = make_db_session()
Base.metadata.create_all(bind=engine)
