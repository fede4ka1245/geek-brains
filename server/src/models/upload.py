from sqlalchemy import Column, Integer, String

from sqlalchemy.orm import relationship

from .base import Base


class Upload(Base):
    __tablename__ = "uploads"

    id = Column(Integer, nullable=False, primary_key=True, index=True, autoincrement=True)
    state = Column(String, default="processing", nullable=False)

    terms = relationship("Term", back_populates="upload")

    def get_audio_file_key(self) -> str:
        return str(self.id) + ".mp3"

    def get_transcription_file_key(self) -> str:
        return str(self.id) + ".txt"
