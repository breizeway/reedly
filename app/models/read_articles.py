from .db import db
from sqlalchemy.schema import ForeignKey
from sqlalchemy.orm import relationship


class ReadArticles(db.Model):
    __tablename__ = 'read_articles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    article_url = db.Column(db.String(500), nullable=False)

    user = db.relationship("User")

    def to_dict(self):
        return {"id": self.id,
                "user_id": self.user_id,
                "article_url": self.article_url}
