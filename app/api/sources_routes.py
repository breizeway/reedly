from flask import Blueprint, request
from flask_login import current_user, login_required
import feedparser
import html

from app.models import db, Source

sources_routes = Blueprint('sources', __name__)


def decode_feed(raw):
    feed = {"title": raw.feed.title,
            "subtitle": raw.feed.subtitle,
            "updated": raw.feed.updated,
            "updated_parsed": raw.feed.updated_parsed,
            "image": raw.feed.image,
            "link": raw.feed.link,
            "num_entries": len(raw.entries)}

    entries = [{"id": entry.id,
                "title": entry.title,
                "author": entry.author,
                "summary": entry.summary,
                "link": entry.link,
                "content": html.unescape(entry.content[0].value),
                "published": entry.published,
                "published_parsed": entry.published_parsed} for entry in raw.entries]

    return {"feed": feed,
            "entries": entries}


@sources_routes.route('/<int:source_id>')
@login_required
def get_source(source_id):
    source_url = db.session.query(Source.source_url) \
                           .filter(Source.id == source_id) \
                           .one_or_none()[0]
    raw = feedparser.parse(source_url)
    decoded = decode_feed(raw)
    return decoded
    return {"raw": raw, "decoded": decoded}
