from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import db, Feed, Source


feed_routes = Blueprint('feeds', __name__)


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
    new_feed = Feed(user_id=dict_current_user["id"], feed_name=data["feedName"])
    db.session.add(new_feed)
    db.session.commit()
    return {
        "id": new_feed.id,
        "user_id": new_feed.user_id,
        "feed_name": new_feed.feed_name,
    }
