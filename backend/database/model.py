
from datetime import datetime
from enum import unique
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref
db = SQLAlchemy()

class Account(db.Model):

    username = db.Column(db.String(36))
    password = db.Column(db.String(128))
    id = db.Column(db.String(4), primary_key=True)


    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'id' : self.id,
            'username' : self.username,
        }
    def get_user(self):
        s = Student.query.filter_by(sid=self.id).first()
        t = Teacher.query.filter_by(tid=self.id).first()
        return s if s else t

class Student(db.Model):

    sid = db.Column(db.String(4), db.ForeignKey('account.id'), primary_key=True)
    name = db.Column(db.String(64, convert_unicode=True), nullable=False)
    house = db.Column(db.String(16, convert_unicode=True), db.ForeignKey('house.name'))
    dob = db.Column(db.Date)
    credit = db.Column(db.Integer)
    gpa = db.Column(db.Float)
    hobby = db.Column(db.String(128, convert_unicode=True))
    description = db.Column(db.String(512, convert_unicode=True))

    score = db.relationship('Score', backref='student')


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
            'description' : self.description,
            'role' : 'Student'
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

    cid = db.Column(db.String(4), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    tid = db.Column(db.String(4), db.ForeignKey('teacher.tid'))
    place = db.Column(db.String(16, convert_unicode=True))
    credit = db.Column(db.Integer)
    time = db.Column(db.String(2))
    refer = db.Column(db.String(128))

    score = db.relationship('Score', backref='course')

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'cid' : self.cid,
            'name' : self.name,
            'place' : self.place,
            'tid' : self.tid,
            'credit' : self.credit,
            'refer' : self.refer,
            'time' : self.time.upper() if self.time else self.time
        }
    def to_schedule(self):
        """Return object data in easily serializeable format"""
        return {
            'cid' : self.cid,
            'name' : self.name,
            'place' : self.place,
            'tid' : self.tid,
            'time' : self.time.upper() if self.time else self.time
        }
    def get_scores(self):
        return self.score
class Score(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.String(4), db.ForeignKey('course.cid'))
    sid = db.Column(db.String(4), db.ForeignKey('student.sid'))
    mid = db.Column(db.Float)
    final = db.Column(db.Float)
    total = db.Column(db.Float)
    status = db.Column(db.Integer)
    semester = db.Column(db.String(4), nullable=False)

    def to_dict(self):
        return {
            'id' : self.id,
            'cid' : self.cid,
            'sid' : self.sid,
            'mid' : self.mid,
            'final' : self.final,
            'total' : self.total,
            'status' : self.status,
            'semester' : self.semester
            
        }
    def to_course_list(self):
        course = Course.query.filter_by(cid=self.cid).first()
        return {
            'cid' : self.cid,
            'sid' : self.sid,
            'mid' : self.mid,
            'final' : self.final,
            'total' : self.total,
            'status' : self.status,
            'name' : course.name,
            'semester' : self.semester,
            'credit' : course.credit 
        }
class Teacher(db.Model):

    tid = db.Column(db.String(4), db.ForeignKey('account.id'), primary_key=True)
    name = db.Column(db.String(64, convert_unicode=True), nullable=False)
    house = db.Column(db.String(16, convert_unicode=True), db.ForeignKey('house.name'))
    dob = db.Column(db.Date)
    degree = db.Column(db.String(16, convert_unicode=True))

    courses = db.relationship('Course', backref='teacher')
    

    def to_dict(self):
        """Return object data in easily serializeable format"""
        return {
            'tid' : self.tid,
            'name' : self.name,
            'dob' : self.dob.strftime("%d/%m/%Y") if self.dob else None,
            'house' : self.house,
            'degree' : self.degree,
            'role' : 'Teacher'
        }
    def get_courses(self):
        return self.courses

class House(db.Model):

    name = db.Column(db.String(16, convert_unicode=True), primary_key=True)
    admin = db.Column(db.String(4))

    students = db.relationship('Student', backref='of_house')
    teachers = db.relationship('Teacher', backref='of_house')
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