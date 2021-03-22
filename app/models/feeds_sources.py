from .db import db
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table

Base = declarative_base()

feeds_sources = db.Table(
    "feeds_sources",
    db.Model.metadata,
    db.Column("feed_id", ForeignKey("feeds.id"), primary_key=True),
    db.Column("source_id", ForeignKey("sources.id"), primary_key=True))
