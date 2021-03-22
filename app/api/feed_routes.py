from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Feed


feed_routes = Blueprint('feeds', __name__)


@feed_routes.route('/')
@login_required
def feeds():
    if current_user.is_authenticated:
        feeds = Feed.query.all()
    return {"feeds": [feed.to_dict() for feed in feeds]}
