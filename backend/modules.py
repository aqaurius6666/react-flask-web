from .database.model import Account, Course, Score, Student, House, Teacher
from .database.model import db
from random import choice
import uuid
from werkzeug.security import generate_password_hash
import datetime
import jwt
def get_new_id():
    last_id = len(Account.query.all())
    return str(1000+last_id)

def get_random_house():
    '''return random house name'''
    return choice(House.query.all()).name

def info(account, student):
    temp = {**account.to_dict(), **student.to_dict()}
    return temp

def encode_auth_token(id, key):
    """
    Generates the Auth Token
    :return: string
    """
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=10),
            'iat': datetime.datetime.utcnow(),
            'id': id
        }
        return jwt.encode(
            payload,
            key,
            algorithm='HS256'
        )
    except Exception as e:
        return e

def validate_date(string):
    try:
        list = [int(x) for x in string.split('/')]
        date = datetime.date(day=list[0], month=list[1], year=list[2])
        return date
    except ValueError:
        raise Exception("Bad Input")


def create_houses_by_list(array):
    for each in array:
        house = House(name=each['name'])
        db.session.add(house)
    db.session.commit()

def create_students_by_list(array):
    for each in array:
        id = get_sid_from_id(each['id'])
        account = Account(username=id,
                            password=generate_password_hash(f"a{id}", method='sha256'),
                            id=id)
        db.session.add(account)
        db.session.commit()
        if each['role'] != 'Student':
            teacher = Teacher(tid=id, 
                        name=each['name'], 
                        dob=datetime.datetime.strptime(each['dob'], "%d/%m/%Y") if 'dob' in each.keys() else None,
                        of_house=House.query.filter_by(name=each['house']).first())
            db.session.add(teacher)
            
        else:
            student = Student(sid=id, 
                        name=each['name'], 
                        dob=datetime.datetime.strptime(each['dob'], "%d/%m/%Y") if 'dob' in each.keys() else None,
                        of_house=House.query.filter_by(name=each['house']).first())
            db.session.add(student)

        
    db.session.commit()

def standardize(name):
    name = name.replace(" ", "")
    name = name.lower()
    return name

def get_sid_from_id(id):
    return str(1000 + int(id))
def get_cid(name):
    name = name[:3].upper()
    filter = name + "%"
    id = str(len(Course.query.filter(Course.cid.like(filter)).all()))
    return name + id

def create_courses_by_list(array):
    for each in array:
        course = Course(cid=get_cid(each['name']),
                        name=each['name'],
                        credit=each['credit'],
                        tid=each['tid'],
                        time=each['time'],
                        place=each['place']
                )
        db.session.add(course)
    db.session.commit()

def create_score_student_by_list(array, student):
    for cid in array:
        if Course.query.filter_by(cid=cid).first():
            if check_time_course_valid(student, cid):
                score = Score(cid=cid, student=student)
                db.session.add(score)
            else:
                raise Exception(f'Time error: {cid}')
        else:
            raise Exception(f'CID invalid: {cid}')
    db.session.commit()

def create_score_students_by_list(array):
    for each in array:
        if 'is_list' in each.keys():
            try:
                student = Student.query.filter_by(sid = each['sid']).first()
                create_score_student_by_list(each['array'], student)
            except Exception as e:
                print(e)

def check_time_course_valid(student, course):
    student_cid = [score.cid for score in Score.query.filter(Score.sid==student.sid, Score.total != 0).all()]
    student_time = [course.time for course in [Course.query.filter_by(cid=cid).first() for cid in student_cid]]
    if Course.query.filter_by(cid=course).first().time in student_time:
        return False
    return True