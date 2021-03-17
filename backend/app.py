
from flask import Flask, jsonify, request, render_template
import json
import requests
from sqlalchemy import or_
from .database.model import (db,
                            Student, Teacher, Course, Score, House, Account)
from werkzeug.security import generate_password_hash, check_password_hash     
from flask_cors import CORS
import jwt
from functools import wraps
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
        acc = Account.query.filter_by(id = data['id']).first()
        if acc:
            return f(acc, *args, **kwargs)
        else:
            return jsonify({"message" : "Token is expired"}), 401
        
    return decorated

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.form['data']
        return render_template("form.html", data=data)
    return render_template("form.html")

@app.route('/api/database/', methods=['GET', 'POST'])
def database():

    if request.method == 'POST':
        scripts = request.form['scripts']
        statement = scripts.split(' ')[0].lower()
        with db.session.connection() as conn:
            try:
                result = conn.execute(scripts)
                if statement == 'select':
                    result = result.fetchall()
                    header = result[0].keys()
                    return render_template('database.html', data=result, header=header, scripts = scripts)
                elif statement == 'update':
                    db.session.commit()
                elif statement == 'insert':
                    db.session.commit()
            except Exception as e:
                return render_template('database.html', error = e)


            

        
    return render_template('database.html')

#-------------------------------------------------------------------------------------------------------------
# GET METHODS
#-------------------------------------------------------------------------------------------------------------
@app.route('/api/scores', methods=['GET'])
def get_scores():
    return jsonify([score.to_dict() for score in Score.query.all()])


@app.route('/api/users', methods=['GET'])
def query_user():
    name = request.args.get('name')
    upper_case_name = name.capitalize()
    # not case sensitive
    #student = db.session.query(Student).filter(Student.name.like(f'%{name}%'))\
    #                                    .with_entities(Student.sid, Student.name)
    #teacher = db.session.query(Teacher).filter(Teacher.name.like(f'%{name}%'))\
    #                                    .with_entities(Teacher.tid, Teacher.name)
    # case sensitive
    student = db.session.query(Student).filter(or_(Student.name.like(f'%{name}%'), Student.name.like(f'%{upper_case_name}%')))\
                                        .with_entities(Student.sid, Student.name)
    teacher = db.session.query(Teacher).filter(or_(Teacher.name.like(f'%{name}%'), Teacher.name.like(f'%{upper_case_name}%')))\
                                        .with_entities(Teacher.tid, Teacher.name)
    array = student.union(teacher).all()
    return jsonify({'array' : array,
                    'length' : len(array)})

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
@app.route('/api/teachers/<house>', methods=['GET'])
def get_teachers_by_house(house):
    array = [teacher.to_dict() for teacher in Teacher.query.filter_by(house=house).all()]
    return jsonify({"array" : array, 
                    "length" : len(array)})
@app.route('/api/courses', methods=['GET'])
def get_courses():
    array = [course.to_dict() for course in Course.query.all()]
    return jsonify({"array" : array, 
                    "length" : len(array)})

#-------------------------------------------------------------------------------------------------------------
# GET ONE METHODS
#-------------------------------------------------------------------------------------------------------------
@app.route('/api/courses/<cid>', methods=['GET'])
@token_required
def get_specific_course(current, cid):
    try:
        course = Course.query.filter_by(cid=cid).first()
        return jsonify({"course": course.to_dcit()}), 200
    except:
        return jsonify({"message" : "Invaild course id"}), 404
    

@app.route('/api/students/<sid>', methods=['GET'])
@token_required
def get_specific_student(current, sid):
    try:
        student = Student.query.filter_by(sid=sid).first()
        return jsonify({"student": student.to_dcit()}), 200
    except:
        return jsonify({"message" : "Invaild student id"}), 404

@app.route('/api/teachers/<tid>', methods=['GET'])
@token_required
def get_specific_teacher(current, tid):
    try:
        teacher = Teacher.query.filter_by(tid=tid).first()
        return jsonify({"teacher": teacher.to_dcit()}), 200
    except:
        return jsonify({"message" : "Invaild teacher id"}), 404

#-------------------------------------------------------------------------------------------------------------
# CREATE METHODS
#-------------------------------------------------------------------------------------------------------------
@app.route('/api/scores', methods=['POST'])
def create_score():
    data = request.json
    if 'is_list' in data.keys():
        pass
    else:
        if Course.query.filter_by(cid=data['cid']).first():
            score = Score(cid=data['cid'], sid=data['sid'])
            db.session.add(score)
        else:
            return jsonify({'message' : 'CID invalid'}), 400
        db.session.commit()
    return jsonify({'message' : 'Create score successfully!'}), 200
@app.route('/api/students', methods=['POST'])
def create_user():
    data = request.json
    if 'is_list' in data.keys():
        if data['is_list']:
            create_students_by_list(data['array'])
    else:
        user = Student(sid=data['sid'], name=data['name'], of_house=House.query.filter_by(name=data['house']).first())
        account = Account(username=data['sid'],
                            password=generate_password_hash(standardize(data['name']), method='sha256'),
                            student=user)
        db.session.add(user)
        db.session.add(account)
        db.session.commit()
    return jsonify({"message" : "Created user successfully!"})

    

@app.route('/api/houses', methods=['POST'])
def create_house():
    data = request.json
    if 'is_list' in data.keys():
        if data['is_list']:
            create_houses_by_list(data['array'])
    else:
        house = House(name=data['name'])
        db.session.add(house)
        db.session.commit()
    return jsonify({"message" : "Created house successfully!"})

@app.route('/api/courses', methods=['POST'])
def create_course():
    data = request.json
    if 'is_list' in data.keys():
        if data['is_list']:
            create_courses_by_list(data['array'])
    else:
        course = Course(cid=data['cid'], 
                        name=data['name'], 
                        tid=data['teacher'], 
                        credit=data['credit'], 
                        time=data['time'],
                        place=data['place'])
        db.session.add(course)
        db.session.commit()
    return jsonify({"message" : "Created course successfully!"})

@app.route('/api/teachers', methods=['POST'])
def create_teacher():
    data = request.json
    teacher = Teacher(tid=data['tid'], 
                        name=data['name'], 
                        of_house=House.query.filter_by(name=data['house']).first())
    db.session.add(teacher)
    db.session.commit()
    return jsonify({"message" : "Created teacher successfully!"})


@app.route('/api/accounts', methods=['POST'])
def create_account():
    data = request.json
    if Account.query.filter_by(username=data['username']).first():
        return jsonify({"message" : "This account has already created!"}), 400
    id = get_new_id()
    if data['role'] == "Student":
        student = Student(sid=id, name="", house=get_random_house())
        db.session.add(student)
    else:
        teacher = Teacher(tid=id, name="", house=get_random_house())
        db.session.add(teacher)

    account = Account(username=data['username'], 
                    password=generate_password_hash(data['password'], method='sha256'),
                    id=id)
    db.session.add(account)
    db.session.commit()
    return jsonify({"message" : "Created account successfully!"}), 201

#-------------------------------------------------------------------------------------------------------------
# GET AUTHENTICATED METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/user/<id>', methods=['GET'])
@token_required
def get_user_by_id(current, id):
    return jsonify({ "user" : Account.query.filter_by(id=id).first().get_user().to_dict(),
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200
@app.route('/api/user', methods=['GET'])    
@token_required
def get_user(current):
    return jsonify({ "user" :current.get_user().to_dict(),
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200
@app.route('/api/account', methods=['GET'])
@token_required
def get_account(current):
    return jsonify({"account" : current.to_dict()})

@app.route('/api/student/<sid>/scores', methods=['GET'])
@token_required
def get_scores_student_by_sid(current, sid):
    student = Student.query.filter_by(sid=sid).first()
    return jsonify({"score" : [score.to_course_list() for score in student.score],
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200

@app.route('/api/student/scores', methods=['GET'])
@token_required
def get_scores_student(current):
    student = current.get_user()
    return jsonify({"score" : [score.to_course_list() for score in student.score],
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200    

@app.route('/api/student/schedule', methods=['GET'])
@token_required
def get_schedule(current):
    student = current.get_user()
    current_course = [score.course for score in student.score if score.total == 0]
    return jsonify({"schedule" : [course.to_schedule() for course in current_course ],
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200

@app.route('/api/student/<sid>/schedule', methods=['GET'])
@token_required
def get_schedule_by_sid(current, sid):
    student = Student.query.filter_by(sid=sid).first()
    current_course = [score.course for score in student.score if score.total == 0]
    return jsonify({"schedule" : [course.to_schedule() for course in current_course],
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200


#-------------------------------------------------------------------------------------------------------------
# CREATE SPECIFIC METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/student/scores', methods=['POST'])
@token_required
def create_score_student(current):
    student = current.get_user()
    data = request.json
    print(data)
    if 'is_list' in data.keys():
        try:
            create_score_student_by_list(data['array'], student)
        except Exception as e:
   
            return jsonify({'message': e.args[0]}), 400
    elif Course.query.filter_by(cid=data['cid']).first():
            print(1)
            score = Score(cid=data['cid'], student=student)
            db.session.add(score)
    else:
        return jsonify({'message': 'CID invalid'}), 400
    db.session.commit()
    return jsonify({'message' : 'Create score successfully',
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 201


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
        return jsonify({"token" : encode_auth_token(account.id, app.config.get('SECRET_KEY')),
                        "account" : account.to_dict(),
                        "message" : "Login successfully!"
                        }), 200
    else:
        return jsonify({"message" : "Username or password is incorrect!"}), 401
        

@app.route('/api/authentication', methods=['GET'])
@token_required
def check(current):
    return jsonify({"token" : encode_auth_token(current.id, app.config['SECRET_KEY']),
                    "account" : current.to_dict() 
                    })

#-------------------------------------------------------------------------------------------------------------
# UPDATE METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/student', methods=['PUT'])
@token_required
def update_student(current):
    student = current.get_user()
    data = request.json
    if data['dob']:
        try:
            data['dob'] = validate_date(data['dob'])
        except:
            return jsonify({"message" : "Bad input"}), 400
    student.update(data)
    db.session.commit()
    return jsonify({"student" : student.to_dict(), "message" : "Update successfully!",
                    "token" : encode_auth_token(current.id, app.config['SECRET_KEY'])}), 200


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
        account = Account.query.filter_by(id=id).first()
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
# DELETE AUTHORIZATIOn METHODS
#-------------------------------------------------------------------------------------------------------------

@app.route('/api/student/scores/<cid>', methods=['DELETE'])
@token_required
def delete_own_course(current, cid):
    try:
        score = Score.query.filter(Score.cid==cid, Score.mid != None, Score.sid==current.get_user().sid).first()
        db.session.delete(score)
        db.session.commit()
        return jsonify({'message' : 'Delete successfully!'}), 200
    except Exception as e:
        print(e)
        return jsonify({'message' : 'Invalid course!'}), 400



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


@app.route('/api/db/reset-all', methods=['GET'])
def reset():
    db.drop_all()
    db.create_all()
    with open('house.json') as f:
        houses = json.load(f)
        requests.post(url='{}/api/houses'.format(app.config['URL']),
                        headers = {'Application-Type' : 'Application/json'},
                        json = houses)
    with open('user.json') as f:
        user = json.load(f)
    
        requests.post(url='{}/api/students'.format(app.config['URL']),
                        headers = {'Application-Type' : 'Application/json'},
                        json = user)
    with open('course.json') as f:
        courses = json.load(f)
    
        requests.post(url='{}/api/courses'.format(app.config['URL']),
                        headers = {'Application-Type' : 'Application/json'},
                        json = courses)
    return jsonify({'message' : 'Reset successfully'}), 200 