from app.models import db, Source, Feed


def seed_sources_w_feeds():
    feed4 = Feed(user_id=2, feed_name='Business')
    feed5 = Feed(user_id=1, feed_name='food and Tech')
    feed6 = Feed(user_id=2, feed_name="Politics")
    source1 = Source(source_url='http://feeds.feedburner.com/Techcrunch',
                     alt_name='TechCrunch', source_img="//storage.googleapis.com/site-assets/Xne8uW_IUiZhV1EuO2ZMzIrc2Ak6NlhGjboZ-Yk0rJ8_sicon-17645433888")
    source2 = Source(source_url='http://fortune.com/finance/feed/',
                     alt_name="Fortune Magazine", source_img="//storage.googleapis.com/site-assets/KNL7ytj0Dhui2ZsV6L1O4FAA0aeYFYMbrw-N0k6d4os_icon-16bb6be95c9")

    source3 = Source(source_url='https://www.theverge.com/rss/index.xml')
    source4 = Source(source_url='https://www.dailypress.com/arcio/rss/category/food-drink/?query=display_date:[now-7d+TO+now]+AND+revision.published:true&sort=display_date:desc',
                     alt_name='Food and Drink')
    source5 = Source(source_url="https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", alt_name="NYT - Politics",
                     source_img="//storage.googleapis.com/site-assets/ZUA_74hE33w8lKwi7Ab1NHoyqVhNelzPabVQ8cwjVlk_icon-17061c758e2")

    source6 = Source(source_url="https://feeds.npr.org/1014/rss.xml",
                     alt_name="NPR", source_img="//storage.googleapis.com/site-assets/bDmK_1mnVXBr3CZxO5V6Ioqlm5ygUhcX46y-yobv5Uk_icon-16f2a2d765c")
    # good pics until source 10
    source7 = Source(source_url="https://bloody-disgusting.com/feed/",
                     alt_name="Bloody-Disgusting")
    source8 = Source(source_url="https://www.iphonehacks.com/feed/",
                     alt_name="iPhone Hacks")
    source9 = Source(source_url="https://www.nintendolife.com/feeds/latest",
                     alt_name="Nintendo Life")
    # big pics until source
    source10 = Source(source_url="https://9to5mac.com/feed/",
                     alt_name="9 to 5 Mac")
    source11 = Source(source_url="https://chromeunboxed.com/feed/",
                     alt_name="Chrome Unboxed")
    source12 = Source(source_url="https://www.slashgear.com/feed/",
                     alt_name="SlashGear")
    source13 = Source(source_url="https://hackaday.com/feed/",
                     alt_name="Hackaday")
    source14 = Source(source_url="https://gizmodo.com/rss",
                     alt_name="Gizmodo")
    source15 = Source(source_url="https://mashable.com/feed/",
                     alt_name="Mashable")
    source16 = Source(source_url="https://www.thenextweb.com/feed/",
                     alt_name="The Next Web")


    # user 1
    feed5.sources.append(source3)
    feed5.sources.append(source4)

    # user 2
    feed4.sources.append(source1)
    feed4.sources.append(source2)
    feed6.sources.append(source5)
    feed6.sources.append(source6)

    db.session.add(feed4)
    db.session.add(feed5)
    db.session.add(feed6)

    db.session.add(source1)
    db.session.add(source2)
    db.session.add(source3)
    db.session.add(source4)
    db.session.add(source5)
    db.session.add(source6)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_sources():
    db.session.execute('TRUNCATE sources CASCADE;')
    db.session.commit()
