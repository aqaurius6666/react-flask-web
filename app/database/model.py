from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class User(db.Model):

    sid = db.Column(db.String(8), primary_key=True)
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)

    def to_dict(self):
        dic = dict()
        dic['sid'] = self.sid
        dic['name'] = self.name
        return dic