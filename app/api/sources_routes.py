from flask import Blueprint, request
from flask_login import current_user, login_required
import feedparser
import html

from app.models import db, Source

sources_routes = Blueprint('sources', __name__)


def decode_feed(raw):
    meta = {}
    return {"feed": feed,
            "entries": [{}]}



@sources_routes.route('/<int:source_id>')
@login_required
def get_source(source_id):
    source_url = db.session.query(Source.source_url) \
                           .filter(Source.id == source_id) \
                           .one_or_none()[0]
    feed = feedparser.parse(source_url)
    print(':::TEST:::', feed['feed']['title'])
    decoded = decode_feed(feed)
    print('   :::DECODED:::   ', decoded)
    return feed
