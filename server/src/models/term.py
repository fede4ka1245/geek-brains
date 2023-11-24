from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship

from .base import Base


class Term(Base):
    __tablename__ = "terms"

    id = Column(Integer, nullable=False, primary_key=True, index=True, autoincrement=True)

    upload_id = Column(Integer, ForeignKey("uploads.id"), nullable=False)
    upload = relationship("Upload", back_populates="terms")

    name = Column(String, nullable=False)
    definition = Column(String)

    time_start = Column(String)
    time_end = Column(String)
