from flask import Flask, jsonify
import os
import psycopg2
app = Flask(__name__)

DATABASE_URL = os.environ['DATABASE_URL']

conn = psycopg2.connect(DATABASE_URL, sslmode='require')

@app.route('/')
def index():
    return "<h1>asdadadasd</h1>"

@app.route('/index')
def index2():
    return "<div>hello guys</div>"

@app.route('/authentication')
def login():
    cursor = conn.cursor()
    cursor.execute("")
    cursor.execute("select * from user where username = admin")
    a = cursor.fetchone()

    return jsonify({"message" : a})

if __name__ == "__main__":
    app.run(debug=True)