from app.models import db, Source, Feed


def seed_sources_w_feeds():
    feed4 = Feed(user_id=2, feed_name='Business')
    feed5 = Feed(user_id=1, feed_name='food and Tech')
    source1 = Source(source_url='http://feeds.feedburner.com/Techcrunch',
                     alt_name='TechCrunch')
    source2 = Source(source_url='http://fortune.com/finance/feed/')

    source3 = Source(source_url='https://www.theverge.com/rss/index.xml')
    source4 = Source(source_url='https://www.dailypress.com/arcio/rss/category/food-drink/?query=display_date:[now-7d+TO+now]+AND+revision.published:true&sort=display_date:desc',
                     alt_name='Food and Drink')

    # user 1
    feed5.sources.append(source3)
    feed5.sources.append(source4)

    # user 2
    feed4.sources.append(source1)
    feed4.sources.append(source2)

    db.session.add(feed4)
    db.session.add(feed5)

    db.session.add(source1)
    db.session.add(source2)
    db.session.add(source3)
    db.session.add(source4)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_sources():
    db.session.execute('TRUNCATE sources CASCADE;')
    db.session.commit()
