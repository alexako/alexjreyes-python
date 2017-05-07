from flask import Flask, flash, redirect, render_template, request, url_for
from xmlparser import RSS_Feed
import config


app = Flask(__name__)

@app.route('/')
def index():
    resp = RSS_Feed(config.CODEPEN_URL)
    if resp.feed.headers["status"] == "200 OK":
        pens = resp.get_all_pens() 
    else:
        pens = [{"title": "See my portfolio at:",
            "description":"<a href='http://codepen.io/alexako'>Codepen.io</a>"}]
    return render_template('index.html', pens=pens)

@app.route('/pong')
def pong():
    return render_template('pong.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

def main(debug):
    app.run(debug=debug)

if __name__ == '__main__':
    main(False)
