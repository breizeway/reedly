from flask.cli import AppGroup
from .users import seed_users, undo_users
from .feeds import seed_feeds, undo_feeds
from .sources_feeds import seed_sources_w_feeds, undo_sources
from .read_articles import seed_read_articles, undo_read_articles


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_feeds()
    seed_sources_w_feeds()
    seed_read_articles()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_feeds()
    undo_sources()
    undo_read_articles()
    # Add other undo functions here
