from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Feed, Source


feed_routes = Blueprint('feeds', __name__)


@feed_routes.route('/')
@login_required
def feeds():
    if current_user.is_authenticated:
        dict_current_user = current_user.to_dict()
        feeds = Feed.query.filter(
            Feed.user_id == dict_current_user["id"]).all()

    return {"feeds": [feed.to_dict() for feed in feeds]}
