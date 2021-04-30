from app.models import db, Source, Feed


def seed_sources_w_feeds():
    feed3 = Feed(user_id=2, feed_name='Good news')
    feed4 = Feed(user_id=2, feed_name='Business')
    feed5 = Feed(user_id=1, feed_name='food and Tech')
    feed6 = Feed(user_id=2, feed_name="Politics")

    source1 = Source(source_url='http://feeds.feedburner.com/Techcrunch',
                     alt_name='TechCrunch', source_img="//storage.googleapis.com/site-assets/Xne8uW_IUiZhV1EuO2ZMzIrc2Ak6NlhGjboZ-Yk0rJ8_sicon-17645433888")

    source2 = Source(source_url='http://fortune.com/finance/feed/',
                     alt_name="Fortune Magazine", source_img="//storage.googleapis.com/site-assets/KNL7ytj0Dhui2ZsV6L1O4FAA0aeYFYMbrw-N0k6d4os_icon-16bb6be95c9")

    source3 = Source(source_url='https://www.theverge.com/rss/index.xml',
                     alt_name="The Verge", source_img="https://storage.googleapis.com/site-assets/PSNTZO8gXFUe-cpCZyApw0vEKWPT4b14D6teBEocIAE_visual-15cd6b8692d")

    source4 = Source(source_url='https://www.dailypress.com/arcio/rss/category/food-drink/?query=display_date:[now-7d+TO+now]+AND+revision.published:true&sort=display_date:desc',
                     alt_name='Food and Drink', source_img="https://storage.googleapis.com/site-assets/x0oe5QzdrtqJPdAiTYOG1GsMdRzGoyIz8L6ZJWqhhlk_visual-16c1db6eec4")

    source5 = Source(source_url="https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml", alt_name="NYT - Politics",
                     source_img="//storage.googleapis.com/site-assets/ZUA_74hE33w8lKwi7Ab1NHoyqVhNelzPabVQ8cwjVlk_icon-17061c758e2")

    source6 = Source(source_url="https://www.huffpost.com/section/politics/feed",
                     alt_name="HuffPost - Politics", source_img="//storage.googleapis.com/site-assets/Ls1ojQ7TbuTnlUcsJEsQDuV7dH8GHnrB2GSbau1ZTF8_icon-16e365340fc")


    source17 = Source(source_url="https://www.goodnewsnetwork.org/feed/",
                    alt_name="Good News Network", source_img="//storage.googleapis.com/site-assets/X_yV_Q02Vv_YnfEbNpfDuAkxtVPzFnnJpHcg4nytGpk_icon-16b563bc3d9")

    source18 = Source(source_url="https://www.theguardian.com/us/media/rss",
                      alt_name="The Gaurdian", source_img="https://storage.googleapis.com/site-assets/fLHFtwryZugkTI3NC4UrLqmHQcckXfXbVh1XRHy9YeE_visual-16d5358690b")

    source19 = Source(
        source_url="https://www.economist.com/finance-and-economics/rss.xml",
        alt_name="The Economist", source_img="https://storage.googleapis.com/site-assets/iAIUsVHadavS0Zh078N8sKe5eQvOQg5FWJOpvgUGarc_visual-165e17fdc1d")

    wash_post = Source(source_url="http://www.washingtonpost.com/wp-dyn/rss/politics/index.xml",
                       alt_name="Washington Post", source_img="//storage.googleapis.com/site-assets/m-EWnENIADoZffb1VeAYGw_z3iMV_DKz1mdjKhuhphY_visual-166f126347c")

    mtv_movies = Source(
        source_url="http://feeds.feedburner.com/mtvmoviesblog",
        alt_name="MTV - Movies", source_img="https://storage.googleapis.com/site-assets/izKfAcEV9lTS0er8mG8oEvPa9cQ_znNBlbEfWju1Az0_visual-17598d69cc4")

    engadget = Source(source_url="https://www.engadget.com/rss-full.xml",
                      alt_name="Engadget", source_img="//storage.googleapis.com/site-assets/4i-1vhCwmRRLfmB7ypTnMh-ZKSvsz6Rgf0lfR0WWb0w_visual-1541543fe44")



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
    feed3.sources.append(source17)
    feed4.sources.append(source1)
    feed4.sources.append(source2)
    feed6.sources.append(source5)
    feed6.sources.append(source6)

    db.session.add(feed3)
    db.session.add(feed4)
    db.session.add(feed5)
    db.session.add(feed6)

    db.session.add(source1)
    db.session.add(source2)
    db.session.add(source3)
    db.session.add(source4)
    db.session.add(source5)
    db.session.add(source6)
    db.session.add(source17)
    db.session.add(source18)
    db.session.add(source19)
    db.session.add(wash_post)
    db.session.add(mtv_movies)
    db.session.add(engadget)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_sources():
    db.session.execute('TRUNCATE sources CASCADE;')
    db.session.commit()
