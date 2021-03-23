from app.models import db, ReadArticles


def seed_read_articles():
    read1 = ReadArticles(user_id=1, article_url='https://www.theverge.com/rss/full.xml')
    read2 = ReadArticles(user_id=1, article_url='https://www.theverge.com/2021/3/23/22346935/verizon-yahoo-plus-subscription-platform-rebrand-online-media')
    read3 = ReadArticles(user_id=1, article_url='https://www.theverge.com/2021/3/23/22346947/black-widow-cruella-luca-disney-plus-streaming-premiere-access-marvel-theaters')

    db.session.add(read1)
    db.session.add(read2)
    db.session.commit()

def undo_read_articles():
    db.session.execute('TRUNCATE read_articles CASCADE;')
    db.session.commit()
