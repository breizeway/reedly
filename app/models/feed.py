from .db import db
from sqlalchemy.schema import ForeignKey

class Feed(db.Model):
  __tablename__ = 'feeds'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable = False)
  feed_name = db.Column(db.String(50), nullable = False)