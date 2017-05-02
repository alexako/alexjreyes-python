import feedparser
import config


class RSS_Feed():
    """Parser for Codepen.io RSS feed"""

    def __init__(self, rss_url):
        self.rss_url = rss_url
        self.feed = feedparser.parse(self.rss_url)

    def get_all_pens(self):
        """Returns a list"""
        return self.feed["items"]

    def get_pen(self, title):
        return filter(lambda p: title.lower() in p.title.lower(), self.feed["items"])


