
from flask import Flask, json, jsonify, request
from .database.model import (db,
                            Student, Teacher, Course, Score, House, Account)
from werkzeug.security import generate_password_hash, check_password_hash     
from flask_cors import CORS
import os
import uuid
import jwt
from functools import wraps
from random import choice
from .modules import *

DATABASE_URL = os.environ['DATABASE_URL']
SECRET_KEY = os.environ['SECRET_KEY']

'''
DATABASE_URL = 'sqlite:///database.db'
SECRET_KEY = "itssecretkey"
'''
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
app.config["SECRET_KEY"] = SECRET_KEY
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_AS_ASCII'] = False
db.init_app(app)
CORS(app)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if "x-access-token" in request.headers:
            token = request.headers['x-access-token']
        
        if not token:
            return jsonify({"message" : "No token"}), 401
        data = None
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms="HS256")
        except:
            return jsonify({"message" : "Token is invalid"}), 401
        acc = Account.query.filter_by(public_id = data['public_id']).first()
        if acc:
            current_user = acc
            return f(current_user, *args, **kwargs)
        else:
            return jsonify({"message" : "Token is expired"}), 401
        
    return decorated



@app.route('/')
def index():

    return "<h1>It's index</h1>"

@app.route('/<sid>', methods=['GET'])
def get_user(sid):
    user = Student.query.filter_by(sid = sid).one()
    return jsonify(user.to_dict())

@app.route('/create-tables', methods=['GET'])
def create_table():
    db.drop_all()
    db.create_all()
    return jsonify({"message" : "Created tables successfully!"})

@app.route('/create', methods=['POST'])
def create_user():
    data = request.json
    user = Student(sid=data['sid'], name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message" : "Created user successfully!"})

@app.route('/houses', methods=['POST'])
def create_house():
    data = request.json
    house = House(hid=data['hid'], name=data['name'])
    db.session.add(house)
    db.session.commit()
    return jsonify({"message" : "Created house successfully!"})

@app.route('/houses', methods=['GET'])
def get_houses():
    houses = [house.to_dict() for house in House.query.all()]
    return jsonify(houses)

@app.route('/teachers', methods=['POST'])
def create_teacher():
    data = request.json
    teacher = Teacher(tid=data['tid'], name=data['name'], of_house=House.query.filter_by(name=data['house_name']).first())
    db.session.add(teacher)
    db.session.commit()
    return jsonify({"message" : "Created teacher successfully!"})

@app.route('/teachers', methods=['GET'])
def get_teachers():
    teachers = [teacher.to_dict() for teacher in Teacher.query.all()]
    return jsonify(teachers)

@app.route('/courses', methods=['POST'])
def create_course():
    data = request.json
    course = Course(cid=data['cid'], 
                    name=data['name'], 
                    credit = data['credit'],
                    classes = data['class'],
                    who_teach=Teacher.query.filter_by(name=data['teacher']).first())

    db.session.add(course)
    db.session.commit()
    return jsonify({"message" : "Created course successfully!"})

@app.route('/courses', methods=['GET'])
def get_courses():
    courses = [course.to_dict() for course in Course.query.all()]
    return jsonify(courses)

@app.route('/accounts', methods=['GET'])
def get_account():
    accounts = [account.to_dict() for account in Account.query.all()]
    return jsonify(accounts)

@app.route('/accounts', methods=['POST'])
def create_account():
    data = request.json

    new_student = Student(sid=get_new_id(), name = "", of_house=get_random_house())
    db.session.add(new_student)

    account = Account(public_id=str(uuid.uuid4()), 
                    username=data['username'], 
                    password=generate_password_hash(data['password'], method='sha256'),
                    of_student=new_student
    )

    db.session.add(account)
    db.session.commit()
    return jsonify({"message" : "Created account successfully!"})


@app.route('/students', methods=['GET'])
def get_students():
    students = [student.to_dict() for student in Student.query.all()]
    return jsonify(students)

@app.route('/students/<public_id>', methods=['GET'])
def get_student(public_id):
    account = Account.query.filter_by(public_id=public_id).first()
    student = Student.query.filter_by(sid=account.sid).first()
    return jsonify(info(account, student))

@app.route('/authentication', methods=['POST'])
def login():
    data = request.json
    account = Account.query.filter_by(username=data['username']).first()
    if not account:
        return jsonify({"message" : "Username or password is incorrect!"}), 401
    
    if check_password_hash(account.password, data['password']):
        return jsonify({"token" : encode_auth_token(account.public_id, app.config.get('SECRET_KEY'))})
    else:
        return jsonify({"message" : "Username or password is incorrect!"}), 401
        



@app.route('/authentication', methods=['GET'])
@token_required
def check(current):
    return jsonify(current.to_dict())