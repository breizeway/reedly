from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table

Base = declarative_base()

# CREATE TABLE pony_handlers (
#   pony_id INTEGER NOT NULL,
#   handler_id INTEGER NOT NULL,
#   PRIMARY KEY (pony_id, handler_id),
#   FOREIGN KEY (pony_id) REFERENCES ponies(id),
#   FOREIGN KEY (handler_id) REFERENCES handlers(id)
# );
feeds_sources = Table(
    "feeds_sources",
    Base.metadata,
    Column("feed_id", ForeignKey("feeds.id"), primary_key=True),
    Column("source_id", ForeignKey("sources.id"), primary_key=True))
