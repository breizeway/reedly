import feedparser

from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Feed, Source
from app.api.sources_routes import standardize_feed
from app.utilities import add_rss_to_source, date_today


feed_routes = Blueprint('feeds', __name__)


def flatten(lst):
    flat_list = []
    for sublist in lst:
        for item in sublist:
            flat_list.append(item)
    return flat_list


@feed_routes.route('/')
@login_required
def feeds():
    if current_user.is_authenticated:
        dict_current_user = current_user.to_dict()
        feeds = Feed.query.filter(
            Feed.user_id == dict_current_user["id"]).all()
        return {"feeds": [feed.to_dict() for feed in feeds]}
    return {'error': 500}


@feed_routes.route('/', methods=["POST"])
@login_required
def add_feed():
    data = request.json
    dict_current_user = current_user.to_dict()
    new_feed = Feed(
        user_id=dict_current_user["id"], feed_name=data["feedName"])
    db.session.add(new_feed)
    db.session.commit()

    if new_feed.id:
        return {
            "id": new_feed.id,
            "user_id": new_feed.user_id,
            "feed_name": new_feed.feed_name,
        }
    else:
        return {'error': 500}


@feed_routes.route('/<int:id>')
@login_required
def sources_on_feed(id):
    right_feed = Feed.query.filter(Feed.id == id).all()

    if right_feed:
        right_feed_dict = right_feed[0].to_dict()
        source_url_list = [source["source_url"]
                        for source in right_feed_dict["sources"]]
        raw_list = [feedparser.parse(source_url) for source_url in source_url_list]
        standardized_list = [standardize_feed(
            raw_item)["entries"] for raw_item in raw_list]
        standardized_source_info = [standardize_feed(raw_item)["feed"] for raw_item in raw_list]
        return {"sources": standardized_list,
                "sources_info": standardized_source_info}
    else:
        return {'error': 404}, 404


@feed_routes.route("/all")
@login_required
def all_feeds():
    if current_user.is_authenticated:
        session_id = current_user.to_dict()["id"]

        feeds = Feed.query.filter(Feed.user_id == session_id) \
                          .all()

        if len(feeds) > 0:
            feeds_dicts = [feed.to_dict() for feed in feeds]
            return {'feeds': feeds_dicts}
        else:
            return {'error': 404}, 404


@feed_routes.route("/views/today", methods=["PUT"])
@login_required
def today_view():
    feed = request.json['feed']
    all_entries = []

    for source in feed['sources']:
        source_w_rss = add_rss_to_source(source)
        entries = source_w_rss['rss_data']['entries']
        filtered_entries = list(filter(date_today, entries))
        all_entries = all_entries + filtered_entries
    feed['entries'] = all_entries

    if len(all_entries) > 0:
        return feed
    else:
        return {'error': 404}, 404


@feed_routes.route("/views/all", methods=["PUT"])
@login_required
def all_view():
    feed = request.json['feed']
    all_entries = []

    for source in feed['sources']:
        source_w_rss = add_rss_to_source(source)
        entries = source_w_rss['rss_data']['entries']
        all_entries = all_entries + entries
    feed['entries'] = all_entries

    if len(all_entries) > 0:
        return feed
    else:
        return {'error': 404}, 404


@feed_routes.route("/<int:id>", methods=["PATCH"])
@login_required
def update_feed(id):

    data = request.json

    feed = Feed.query.get(data["feed_id"])
    feed.feed_name = data["feed_name"]

    db.session.add(feed)
    db.session.commit()

    if feed:
        return {"feed": feed.to_dict()}
    else:
        return {'error': 404}, 404


@feed_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_feed(id):
    data = request.json

    feed = Feed.query.get(id)

    db.session.delete(feed)
    db.session.commit()

    if feed:
        return {"feed": feed.to_dict()}
    else:
        return {'error': 500}
