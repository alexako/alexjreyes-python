
from flask import Flask, flash, redirect, render_template, request, url_for


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404

def main(debug):
    app.run(debug=debug)

if __name__ == '__main__':
    main(False)
