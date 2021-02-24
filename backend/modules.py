from .database.model import Account, Student, House
from .database.model import db
from random import choice
import uuid
from werkzeug.security import generate_password_hash
import datetime
import jwt
def get_new_id():
    
    last_id = Student.query.order_by(Student.sid.desc()).first()
    if last_id:
        last_id = str(int(last_id.sid) + 1)
    else:
        last_id = "10000000"
    return last_id

def get_random_house():
    '''return random house object'''
    return choice(House.query.all())

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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
            'iat': datetime.datetime.utcnow(),
            'public_id': id
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
        student = Student(sid=each['sid'], 
                        name=each['name'], 
                        dob=each['dob'] if 'dob' in each.keys() else None,
                        of_house=House.query.filter_by(name=each['house']).first())
        account = Account(pid=str(uuid.uuid4()),
                            username=each['sid'],
                            password=generate_password_hash(standardize(each['name']), method='sha256'),
                            student=student)
        db.session.add(student)
        db.session.add(account)
    db.session.commit()

def standardize(name):
    name = name.replace(" ", "")
    name = name.lower()
    return name
   