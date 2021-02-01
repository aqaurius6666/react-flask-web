
from flask import Flask, jsonify, request
from .database.model import db, User
import os

DATABASE_URL = os.environ['DATABASE_URL']
SECRET_KEY = os.environ['SECRET_KEY']

'''
DATABASE_URL = 'sqlite:///E:\\Code\\heroku\\backend\\database\\db.db'
SECRET_KEY = "asdadas"
'''
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SECRET_KEY"] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_AS_ASCII'] = False
db.init_app(app)
@app.route('/')
def index():

    return "<h1>It's index</h1>"

@app.route('/<sid>', methods=['GET'])
def get_user(sid):
    user = User.query.filter_by(sid = sid).one()
    return jsonify(user.to_dict())

@app.route('/create-tables', methods=['GET'])
def create_table():
    db.drop_all()
    db.create_all()
    return jsonify({"message" : "Created tables successfully!"})

@app.route('/create', methods=['POST'])
def create_user():
    data = request.json
    user = User(sid=data['sid'], name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message" : "Created user successfully!"})