
from datetime import datetime
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
db = SQLAlchemy()

class Account(db.Model):

    pid = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(36), unique=True)
    password = db.Column(db.String(128))
    sid = db.Column(db.String(8), db.ForeignKey('student.sid'))


    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'pid' : self.pid,
            'username' : self.username,
            'sid' : self.sid
        }

class Student(db.Model):

    sid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    house = db.Column(db.String(32, convert_unicode=True), db.ForeignKey('house.name'))
    dob = db.Column(db.Date)
    credit = db.Column(db.Integer)
    gpa = db.Column(db.Float)
    hobby = db.Column(db.String(128, convert_unicode=True))
    description = db.Column(db.String(512, convert_unicode=True))

    score = db.relationship('Score', backref='student')
    account = db.relationship('Account', backref='student', uselist=None)


    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'sid' : self.sid,
            'name' : self.name,
            'dob' : self.dob.strftime("%d/%m/%Y") if self.dob else None,
            'house' : self.house,
            'credit' : self.credit,
            'gpa' : self.gpa,
            'hobby' : self.hobby,
            'description' : self.description
        }
    def update(self, data):
        self.name = data['name']
        self.dob = data['dob']
        self.house = data['house']
        self.credit = data['credit']
        self.gpa = data['gpa']
        self.sid = data['sid']
        self.hobby = data['hobby']
        self.description = data['description']

class Course(db.Model):

    cid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    tid = db.Column(db.String(8), db.ForeignKey('teacher.tid'))
    place = db.Column(db.String(16, convert_unicode=True))
    credit = db.Column(db.Integer)
    refer = db.Column(db.String(128))

    score = db.relationship('Score', backref='course')

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'cid' : self.cid,
            'name' : self.name,
            'place' : self.place,
            'tid' : self.tid,
            'classes' : self.classes,
            'credit' : self.credit,
            'refer' : self.refer
        }
    def get_scores(self):
        return self.score
class Score(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.String(8), db.ForeignKey('course.cid'))
    sid = db.Column(db.String(8), db.ForeignKey('student.sid'))
    mid = db.Column(db.Float)
    final = db.Column(db.Float)
    total = db.Column(db.Float)
    status = db.Column(db.Integer)

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'id' : self.id,
            'cid' : self.cid,
            'sid' : self.sid,
            'mid' : self.mid,
            'final' : self.final,
            'total' : self.total,
            'status' : self.status
        }
class Teacher(db.Model):

    tid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    house = db.Column(db.String(32, convert_unicode=True), db.ForeignKey('house.name'))
    dob = db.Column(db.Date)
    degree = db.Column(db.String(16, convert_unicode=True))

    courses = db.relationship('Course', backref='teacher')
    

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'tid' : self.tid,
            'name' : self.name,
            'dob' : self.dob,
            'house' : self.house,
            'degree' : self.degree
        }
    def get_courses(self):
        return self.courses

class House(db.Model):

    name = db.Column(db.String(32, convert_unicode=True), nullable=False, primary_key=True)
    admin = db.Column(db.String(8))

    students = db.relationship('Student', backref='house')
    teachers = db.relationship('Teacher', backref='house')
    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'name' : self.name,
            'admin' : self.admin
        }
    def get_students(self):
        return self.students
    
    def get_teachers(self):
        return self.teachers