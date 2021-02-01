from flask import Flask, jsonify
import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

app = Flask(__name__)


@app.route('/')
def index():
    return "<h1>asdadadasd</h1>"

@app.route('/index')
def index2():
    return "<div>hello guys</div>"

@app.route('/authentication')
def login():
    cur = conn.cursor()
    print(cur)
    pass

if __name__ == "__main__":
    app.run(debug=True)