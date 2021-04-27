import feedparser
import datetime

def val_if_exists(key, dictionary):
    if key in dictionary:
        return dictionary[key]
    else:
        return ''

def add_rss_to_source(source):
    raw_rss = feedparser.parse(source['source_url'])

    about = {"title": val_if_exists(key='title', dictionary=raw_rss.feed),
            "subtitle": val_if_exists(key='subtitle', dictionary=raw_rss.feed),
            "updated": val_if_exists(key='updated', dictionary=raw_rss.feed),
            "updated_parsed": val_if_exists(key='updated_parsed',
                                            dictionary=raw_rss.feed),
            "image": val_if_exists(key='image', dictionary=raw_rss.feed),
            "link": val_if_exists(key='link', dictionary=raw_rss.feed),
            "icon": val_if_exists(key='icon', dictionary=raw_rss.feed),
            "num_entries": len(raw_rss.entries)}

    entries = [{"id": val_if_exists(key="id", dictionary=entry),
                "title": val_if_exists(key="title", dictionary=entry),
                "author": val_if_exists(key="author", dictionary=entry),
                "summary": val_if_exists(key="summary", dictionary=entry),
                "link": val_if_exists(key="link", dictionary=entry),
                "content": val_if_exists(key="content", dictionary=entry),
                "media_content": val_if_exists(key="media_content",
                                               dictionary=entry),
                "published": val_if_exists(key="published", dictionary=entry),
                "published_parsed": val_if_exists(key="published_parsed",
                                                  dictionary=entry)}
               for entry in raw_rss.entries]

    source['rss_data'] = {
        'about': about,
        'entries': entries
    }

    return source


def date_today(entry):
    entry_date = datetime.date(list(entry['published_parsed'])[0],
                               list(entry['published_parsed'])[1],
                               list(entry['published_parsed'])[2])

    today = datetime.date.today()

    return entry_date == today
