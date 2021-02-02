
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

db = SQLAlchemy()

class Account(db.Model):

    public_id = db.Column(db.String(36), primary_key=True)
    username = db.Column(db.String(36), unique=True)
    password = db.Column(db.String(64))
    sid = db.Column(db.String(8), db.ForeignKey('student.sid'))

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'public_id' : self.public_id,
            'username' : self.username,
            'sid' : self.sid
        }

class Student(db.Model):

    sid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    hid = db.Column(db.String(4), db.ForeignKey('house.hid'))
    dob = db.Column(db.Date)
    credit = db.Column(db.Integer)
    gpa = db.Column(db.Float)

    score = db.relationship('Score', backref='of_student')
    account = db.relationship('Account', backref='of_student', uselist=None)


    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'sid' : self.sid,
            'name' : self.name,
            'dob' : self.dob,
            'hid' : self.hid,
            'credit' : self.credit,
            'gpa' : self.gpa
        }
class Course(db.Model):

    cid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    tid = db.Column(db.String(8), db.ForeignKey('teacher.tid'))
    place = db.Column(db.String(16, convert_unicode=True))
    credit = db.Column(db.Integer)
    classes = db.Column(db.Integer)
    document = db.Column(db.String(128))

    score = db.relationship('Score', backref='of_course')

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'cid' : self.cid,
            'name' : self.name,
            'place' : self.place,
            'tid' : self.tid,
            'classes' : self.classes,
            'credit' : self.credit,
            'document' : self.document
        }
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
    hid = db.Column(db.String(4), db.ForeignKey('house.hid'))
    dob = db.Column(db.Date)
    degree = db.Column(db.String(16, convert_unicode=True))

    course = db.relationship('Course', backref='who_teach')

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'tid' : self.tid,
            'name' : self.name,
            'dob' : self.dob,
            'hid' : self.hid,
            'degree' : self.degree
        }
class House(db.Model):

    hid = db.Column(db.String(4), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    admin = db.Column(db.String(8))

    students = db.relationship('Student', backref='of_house')
    teachers = db.relationship('Teacher', backref='of_house')

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'name' : self.name,
            'admin' : self.admin,
            'hid' : self.hid
        }