from app.models import db, Feed, Source


# Adds a demo user, you can add other users here if you want
def seed_feeds():

    feed = Feed(user_id=1, feed_name='Technology')
    feed2 = Feed(user_id=1, feed_name='Cars')

    db.session.add(feed)
    db.session.add(feed2)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_feeds():
    db.session.execute('TRUNCATE feeds CASCADE')
    db.session.commit()
