# Use a base Python image
FROM python:3.11
WORKDIR /app
ARG BACKEND_URL

COPY . .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000
ENTRYPOINT [ "python", "main.py" ]