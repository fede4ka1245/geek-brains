import tempfile

from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.encoders import jsonable_encoder
from starlette.requests import Request
from starlette.responses import FileResponse

from config import S3_AUDIO_BUCKET, s3, db_session
from src.models import Upload

app = FastAPI()


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store"
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response


@app.post("/upload")
async def upload_audio_file(file: UploadFile | None = None):
    if file is None or file.content_type is None:
        return {"message": "No file sent"}
    else:
        upload = Upload(state="created")
        db_session.add(upload)
        db_session.commit()

        try:
            s3.upload_fileobj(file.file, Bucket=S3_AUDIO_BUCKET, Key=upload.get_audio_file_key())
        except Exception:
            upload.state = "died"
        else:
            upload.state = "audio"
        finally:
            upload_id = upload.id
            db_session.commit()
            return jsonable_encoder(db_session.query(Upload).get(upload_id))


@app.get("/uploads")
async def get_upload():
    return db_session.query(Upload).all()


@app.get("/uploads/{upload_id}")
async def get_upload(upload_id: int):
    upload = db_session.query(Upload).get(upload_id)
    if upload is None:
        raise HTTPException(status_code=404, detail="Upload not found")
    else:
        return upload


@app.get("/uploads/{upload_id}/state")
async def get_upload_state(upload_id: int):
    upload = await get_upload(upload_id)
    return upload.state


@app.get("/uploads/{upload_id}/audio")
async def get_upload_audio(upload_id: int):
    upload = await get_upload(upload_id)

    with tempfile.NamedTemporaryFile(delete=False) as temporary_audio_file:
        s3.download_file(Filename=temporary_audio_file.name, Bucket=S3_AUDIO_BUCKET, Key=upload.get_audio_file_key())
        return FileResponse(temporary_audio_file.name)


@app.get("/uploads/{upload_id}/transcription")
async def get_upload_transcription(upload_id: int):
    upload = await get_upload(upload_id)

    with tempfile.NamedTemporaryFile(delete=False) as temporary_transcription_file:
        s3.download_file(Filename=temporary_transcription_file.name, Bucket=S3_AUDIO_BUCKET, Key=upload.get_transcription_file_key())
        return FileResponse(temporary_transcription_file.name)


@app.get("/uploads/{upload_id}/summary")
async def get_upload_transcription(upload_id: int):
    upload = await get_upload(upload_id)

    with tempfile.NamedTemporaryFile(delete=False) as temporary_summary_file:
        s3.download_file(Filename=temporary_summary_file.name, Bucket=S3_AUDIO_BUCKET, Key=upload.get_summary_file_key())
        return FileResponse(temporary_summary_file.name)


@app.get("/uploads/{upload_id}/terms")
async def get_upload_terms(upload_id: int):
    upload = await get_upload(upload_id)
    return upload.terms
