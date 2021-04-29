from flask import Blueprint, request
from flask_login import current_user, login_required
import feedparser
import html  # html.unescape()

from app.models import db, Source, Feed, feeds_sources


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
            "icon": val_if_exists(key='icon', dictionary=raw.feed),}

    entries = [{"id": val_if_exists(key="id", dictionary=entry),
                "title": val_if_exists(key="title", dictionary=entry),
                "author": val_if_exists(key="author", dictionary=entry),
                "summary": val_if_exists(key="summary", dictionary=entry),
                "link": val_if_exists(key="link", dictionary=entry),
                "content": val_if_exists(key="content", dictionary=entry),
                "media_content": val_if_exists(key="media_content",
                                               dictionary=entry),
                "published": val_if_exists(key="published", dictionary=entry),
                "published_parsed": val_if_exists(key="published_parsed",
                                                  dictionary=entry)}
               for entry in raw.entries]

    return {"feed": feed,
            "entries": entries}


@sources_routes.route("/", methods=["GET"])
def get_all_sources():

    sources = Source.query.all()

    return {"sources": [source.to_dict() for source in sources]}



@sources_routes.route('/', methods=['PUT'])
@login_required
def get_sources():
    ids = request.json['ids']

    sources = db.session.query(Source) \
                           .filter(Source.id.in_(ids)) \
                           .all()

    source_dicts = [source.to_dict() for source in sources]

    if sources:
        return {'sources': source_dicts}
    else:
        return {'error': 404}, 404


@sources_routes.route('/<int:source_id>')
@login_required
def get_source(source_id):
    source = db.session.query(Source.source_url) \
                           .filter(Source.id == source_id) \
                           .one_or_none()

    if source:
        source_url = source[0]
        raw = feedparser.parse(source_url)
        standardized_feed = standardize_feed(raw)
        return {"raw": raw, "standardized": standardized_feed}
    else:
        return {'error': 404}, 404


@sources_routes.route('/new', methods=['POST'])
@login_required
def add_source():
    body = request.json

    raw = feedparser.parse(body['source_url'])
    standardized_feed = standardize_feed(raw)


    write_feed = Feed.query.get(int(body['feed_id']))
    newSource = Source(source_url=body['source_url'],
                       alt_name=standardized_feed['feed']['title'],
                       source_img=standardized_feed['feed']['icon'] if standardized_feed['feed']['icon'] else None)
    write_feed.sources.append(newSource)
    db.session.add(newSource)
    db.session.commit()

    source_id = newSource.to_dict()["id"]

    if source_id:
        return {"raw": raw,
                "standardized": standardized_feed,
                "id": source_id,
                "db_data": newSource.to_dict()}
    else:
        return {'error': 500}


@sources_routes.route("/<int:source_id>/unfollow/", methods=["DELETE"])
def unfollow_source(source_id):

    data = request.json

    feed = Feed.query.get(data["feed"]["id"])

    source = Source.query.get(source_id)

    feed.sources.remove(source)
    db.session.commit()

    if feed:
        return {"feed": feed.to_dict()}
    else:
        return {'error': 500}


@sources_routes.route("/<int:source_id>/follow/", methods=["POSt"])
def follow_source(source_id):

    data = request.json

    feed = Feed.query.get(data["feedId"])

    source = Source.query.get(source_id)

    feed.sources.append(source)
    db.session.commit()

    if feed:
        return {"feed": feed.to_dict()}
    else:
        return {'error': 500}
