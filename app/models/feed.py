from .db import db
from app.models import feeds_sources
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship


class Feed(db.Model):
    __tablename__ = "feeds"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    feed_name = db.Column(db.String(50), nullable=False)

    user = db.relationship("User", back_populates="feeds")
    sources = db.relationship("Source", secondary=feeds_sources,
                           back_populates="feeds")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "feed_name": self.feed_name
        }
