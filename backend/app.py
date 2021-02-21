
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

app = Flask(__name__)
CORS(app)
HEROKU = "config_heroku.py"
LOCAL = "config_local.py"
app.config.from_pyfile(HEROKU)
db.init_app(app)

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
            return f(acc, *args, **kwargs)
        else:
            return jsonify({"message" : "Token is expired"}), 401
        
    return decorated

@app.route('/')
def index():

    return "<h1>It's index</h1>"
#-------------------------------------------------------------------------------------------------------------
# GET LIST METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/accounts', methods=['GET'])
def get_accounts():
    return jsonify([account.to_dict() for account in Account.query.all()])

@app.route('/api/students', methods=['GET'])
def get_students():
    return jsonify([student.to_dict() for student in Student.query.all()])

@app.route('/api/houses', methods=['GET'])
def get_houses():
    return jsonify([house.to_dict() for house in House.query.all()])

@app.route('/api/teachers', methods=['GET'])
def get_teachers():
    return jsonify([teacher.to_dict() for teacher in Teacher.query.all()])

@app.route('/api/courses', methods=['GET'])
def get_courses():
    return jsonify([course.to_dict() for course in Course.query.all()])

#-------------------------------------------------------------------------------------------------------------
# CREATE METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/create', methods=['POST'])
def create_user():
    data = request.json
    user = Student(sid=data['sid'], name=data['name'])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message" : "Created user successfully!"})

@app.route('/api/houses', methods=['POST'])
def create_house():
    data = request.json
    house = House(hid=data['hid'], name=data['name'])
    db.session.add(house)
    db.session.commit()
    return jsonify({"message" : "Created house successfully!"})

@app.route('/api/teachers', methods=['POST'])
def create_teacher():
    data = request.json
    teacher = Teacher(tid=data['tid'], name=data['name'], of_house=House.query.filter_by(name=data['house_name']).first())
    db.session.add(teacher)
    db.session.commit()
    return jsonify({"message" : "Created teacher successfully!"})

@app.route('/api/courses', methods=['POST'])
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

@app.route('/api/accounts', methods=['POST'])
def create_account():
    data = request.json
    if Account.query.filter_by(username=data['username']).first():
        return jsonify({"message" : "This account has already created!"}), 400
    new_student = Student(sid=get_new_id(), name = "", of_house=get_random_house())
    db.session.add(new_student)

    account = Account(public_id=str(uuid.uuid4()), 
                    username=data['username'], 
                    password=generate_password_hash(data['password'], method='sha256'),
                    of_student=new_student
    )

    db.session.add(account)
    db.session.commit()
    return jsonify({"message" : "Created account successfully!"}), 201

#-------------------------------------------------------------------------------------------------------------
# GET SPECIFIC METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/students/<public_id>', methods=['GET'])
def get_student(public_id):
    account = Account.query.filter_by(public_id=public_id).first()
    student = Student.query.filter_by(sid=account.sid).first()
    return jsonify(info(account, student))

@app.route('/api/student', methods=['GET'])
@token_required
def get_student_info(current):
    return jsonify({"student" : current.of_student.to_dict()})
@app.route('/api/account', methods=['GET'])
@token_required
def get_account_info(current):
    return jsonify({"user" : current.to_dict()})


#-------------------------------------------------------------------------------------------------------------
# AUTHENTICATION
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/authentication', methods=['POST'])
def login():
    data = request.json
    account = Account.query.filter_by(username=data['username']).first()
    if not account:
        return jsonify({"message" : "Username or password is incorrect!"}), 401
    
    if check_password_hash(account.password, data['password']):
        return jsonify({"token" : encode_auth_token(account.public_id, app.config.get('SECRET_KEY')),
                        "user" : account.to_dict(),
                        "message" : "Login successfully!"
                        }), 200
    else:
        return jsonify({"message" : "Username or password is incorrect!"}), 401
        

@app.route('/api/authentication', methods=['GET'])
@token_required
def check(current):
    return jsonify({"user" : current.to_dict()})

#-------------------------------------------------------------------------------------------------------------
# UPDATE METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/student', methods=['PUT'])
@token_required
def update_student(current):
    student = current.of_student
    data = request.json
    if data['dob']:
        try:
            data['dob'] = validate_date(data['dob'])
        except:
            return jsonify({"message" : "Bad input"}), 400
    student.update(data)
    db.session.commit()
    return jsonify({"student" : student.to_dict(), "message" : "Update successfully!"}), 200


@app.route('/api/account', methods=['PUT'])
@token_required
def update_account(current):
    data = request.json
    if check_password_hash(current.password, data['old_password']):
        print(data['old_password'])
        print(data['password'])
        current.password = generate_password_hash(password=data['password'], 
                                                    method='sha256')
        db.session.commit()
        return jsonify({"message" : "Change password successfully!"}), 200
    else:
        return jsonify({"message" : "Old password is wrong!"}), 400

#-------------------------------------------------------------------------------------------------------------
# DELETE METHOD
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/delete/account/<id>', methods=['DELETE'])
def delete_account(id):
    try:
        account = Account.query.filter_by(public_id=id).first()
        db.session.delete(account)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message" : "Failed to delete!"}), 400

@app.route('/api/delete/student/<id>', methods=['DELETE'])
def delete_student(id):
    try:
        student = Student.query.filter_by(sid=id).first()
        db.session.delete(student)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        return jsonify({"message" : "Failed to delete!"}), 400

@app.route('/api/delete/course/<id>', methods=['DELETE'])
def delete_course(id):
    try:
        course = Course.query.filter_by(cid=id).first()
        db.session.delete(course)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        return jsonify({"message" : "Failed to delete!"}), 400

@app.route('/api/delete/score/<id>', methods=['DELETE'])
def delete_score(id):
    try:
        score = Score.query.filter_by(sid=id).first()
        db.session.delete(score)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        return jsonify({"message" : "Failed to delete!"}), 400

@app.route('/api/delete/teacher/<id>', methods=['DELETE'])
def delete_teacher(id):
    try:
        teacher = Teacher.query.filter_by(tid=id).first()
        db.session.delete(teacher)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        return jsonify({"message" : "Failed to delete!"}), 400
@app.route('/api/delete/house/<id>', methods=['DELETE'])
def delete_house(id):
    try:
        house = House.query.filter_by(hid=id).first()
        db.session.delete(house)
        db.session.commit()
        return jsonify({"message" : "Delete successfully!"}), 200
    except Exception as e:
        return jsonify({"message" : "Failed to delete!"}), 400


#-------------------------------------------------------------------------------------------------------------
# DATABASE METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/db/create-tables', methods=['GET'])
def create_table():
    db.create_all()
    return jsonify({"message" : "Created tables successfully!"})

@app.route('/api/db/drop-tables', methods=['GET'])
def drop():
    db.drop_all()
    return jsonify({"message" : "Dropped tables successfully!"})