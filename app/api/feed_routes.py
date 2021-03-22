from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Feed


feed_routes = Blueprint('feeds', __name__)


@feed_routes.route('/')
@login_required
def feeds():
    feeds = Feed.query.all()
    return {"feeds": [feed.to_dict() for feed in feeds]}
