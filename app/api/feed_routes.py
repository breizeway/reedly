from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Feed, Source
import feedparser
from app.api.sources_routes import standardize_feed

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


@feed_routes.route('/', methods=["POST"])
def add_feed():
    data = request.json
    print("data in post route add-feed form", data)
    dict_current_user = current_user.to_dict()
    new_feed = Feed(
        user_id=dict_current_user["id"], feed_name=data["feedName"])
    db.session.add(new_feed)
    db.session.commit()
    return {
        "id": new_feed.id,
        "user_id": new_feed.user_id,
        "feed_name": new_feed.feed_name,
    }


@feed_routes.route('/<int:id>')
def sources_on_feed(id):
    right_feed = Feed.query.filter(Feed.id == id).all()
    right_feed_dict = right_feed[0].to_dict()
    source_url_list = [source["source_url"]
                       for source in right_feed_dict["sources"]]
    print("::::SOURCEIDLIST::::::::", source_url_list)
    raw_list = [feedparser.parse(source_url) for source_url in source_url_list]
    standardized_list = [standardize_feed(
        raw_item)["entries"] for raw_item in raw_list]
    standardized_source_info = [standardize_feed(raw_item)["feed"] for raw_item in raw_list]

    return {"sources": standardized_list,
            "sources_info": standardized_source_info}


@feed_routes.route("/all")
def all_feeds():
    if current_user.is_authenticated:
        dict_current_user = current_user.to_dict()
        feeds = Feed.query.filter(
            Feed.user_id == dict_current_user["id"]).all()
        feeds_dict = [feed.to_dict() for feed in feeds]
        source_list = [feed["sources"] for feed in feeds_dict]
        flattened_source_list = flatten(source_list)
        source_url_list = [source["source_url"] for source in flattened_source_list]
        raw_list = [feedparser.parse(source_url) for source_url in source_url_list]
        standardized_list = [standardize_feed(
            raw_item)["entries"] for raw_item in raw_list]
        standardized_source_info = [standardize_feed(
            raw_item)["feed"] for raw_item in raw_list]

        return {"sources": standardized_list,
                "sources_info": standardized_source_info}


@feed_routes.route("/<int:id>", methods=["PATCH"])
def update_feed(id):

    data = request.json

    feed = Feed.query.get(data["feed_id"])
    feed.feed_name = data["feed_name"]

    db.session.add(feed)
    db.session.commit()

    return {"feed": feed.to_dict()}


@feed_routes.route("/<int:id>", methods=["DELETE"])
def delete_feed(id):

    data = request.json

    feed = Feed.query.get(id)
    print("FEED", feed)

    db.session.delete(feed)
    db.session.commit()

    return {"feed": feed.to_dict()}
