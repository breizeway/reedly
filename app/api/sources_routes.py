from flask import Blueprint, request
from flask_login import current_user, login_required
import feedparser
import html  # html.unescape()

from app.models import db, Source

sources_routes = Blueprint('sources', __name__)


def val_if_exists(key, dictionary):
    if key in dictionary:
        return dictionary[key]
    else:
        return ''


def standardize_feed(raw):
    feed = {"title": val_if_exists(key='title', dictionary=raw.feed),
            "subtitle": val_if_exists(key='subtitle', dictionary=raw.feed),
            "updated": val_if_exists(key='updated', dictionary=raw.feed),
            "updated_parsed": val_if_exists(key='updated_parsed',
                                            dictionary=raw.feed),
            "image": val_if_exists(key='image', dictionary=raw.feed),
            "link": val_if_exists(key='link', dictionary=raw.feed),
            "num_entries": len(raw.entries)}

    entries = [{"id": val_if_exists(key="id", dictionary=entry),
                "title": val_if_exists(key="title", dictionary=entry),
                "author": val_if_exists(key="author", dictionary=entry),
                "summary": val_if_exists(key="summary", dictionary=entry),
                "link": val_if_exists(key="link", dictionary=entry),
                "content": val_if_exists(key="content", dictionary=entry),
                "published": val_if_exists(key="published", dictionary=entry),
                "published_parsed": val_if_exists(key="published_parsed",
                                                  dictionary=entry)}
               for entry in raw.entries]

    return {"feed": feed,
            "entries": entries}


@sources_routes.route('/<int:source_id>')
@login_required
def get_source(source_id):
    source_url = db.session.query(Source.source_url) \
                           .filter(Source.id == source_id) \
                           .one_or_none()[0]
    raw = feedparser.parse(source_url)
    standardized_feed = standardize_feed(raw)
    return standardized_feed
    return raw
    return {"raw": raw, "decoded": decoded}
