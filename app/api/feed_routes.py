from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Feed


feed_routes = Blueprint('feeds', __name__)
