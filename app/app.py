from flask import Flask, flash, redirect, render_template, request, url_for
from flask_socketio import SocketIO, emit, send
from xmlparser import RSS_Feed
import os


app = Flask(__name__)

socketio = SocketIO(app)

@app.route('/')
def index():
    resp = RSS_Feed(os.environ["CODEPEN_URL"])
    if resp.feed.bozo: #status != 200
        pens = [{"title": "See my portfolio at:",
            "description":"<a href='http://codepen.io/alexako'>Codepen.io</a>"}]
    else:
        pens = resp.get_all_pens() 
    return render_template('index.html', pens=pens)

@socketio.on("submit vote")
def submit_vote(vote):
    selection = vote["selection"]
    emit("announce vote", {"selection": selection}, broadcast=True)

@app.route('/pong')
def pong():
    return render_template('pong.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

def main(debug):
    # app.run(debug=debug)
    socketio.run(app)

if __name__ == '__main__':
    main(False)
