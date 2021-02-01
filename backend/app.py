
from flask import Flask, json, jsonify
from .database.model import db, User
'''
DATABASE_URL = os.environ['DATABASE_URL']
SECRET_KEY = os.environ['SECRET_KEY']
'''
DATABASE_URL = 'sqlite:///E:\\Code\\heroku\\app\\database\\db.db'
SECRET_KEY = "asdadas"
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SECRET_KEY"] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
@app.route('/')
def index():

    return "<h1>It's index</h1>"

@app.route('/<sid>', methods=['GET'])
def get_user(sid):
    user = User.query.filter_by(sid = sid).one()
    return user.to_dict()

@app.route('/create-tables', methods=['GET'])
def create_table():
    db.drop_all()
    db.create_all()
    return jsonify({"message" : "Created tables successfully!"})