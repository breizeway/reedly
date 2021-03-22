from app.models import db, Source, Feed

def seed_sources_w_feeds():
    feed4 = Feed(user_id=2, feed_name='Business')
    source1 = Source(source_url='http://feeds.feedburner.com/Techcrunch',
                    alt_name='TechCrunch',
                    feeds=[feed4])
    source2 = Source(source_url='http://fortune.com/finance/feed/',
                    alt_name='Finance',
                    feeds=[feed4])

    db.session.add(source1)
    db.session.add(source2)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_sources():
    db.session.execute('TRUNCATE seeds;')
    db.session.commit()