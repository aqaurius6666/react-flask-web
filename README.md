# Web app: Hogwarts's Students Management Site

## About: 
Trang web thông tin của trường phù thuỷ Hogwarts. Nơi mà học sinh, giáo viên có thể xem thời gian biểu cũng như chỉnh sửa môn học, thông tin của mình.


## Kế hoạch:

### Đối tượng phục vụ:
* Sinh viên
* Giáo viên
* Quản lý
* Khách

### User Stories:
#### Tất cả:
* Cần 1 trang hiển thị thông báo, tin tức
* Cần 1 trang giới thiệu thông tin về trường

#### Sinh viên:
* Cần biết những môn học hiện có, thông tin về những môn học
* Cần tra cứu điểm môn học, điểm tổng kết của bản thân
* Cần tra thông tin của người khác
* Cần đăng ký lịch học 
* Cần thay đổi thông tin bản thân
* Cần trích xuất thời khóa biểu

#### Giáo viên:
* Cần biết lịch giảng dạy
* Cần nhập điểm cho sinh viên
* Cần sửa đổi tài liệu môn học

#### Quản lý:
* Trích xuất thống kê thành viên
* Xóa bỏ thành viên

## Thiết kế:
![image (3)](https://user-images.githubusercontent.com/54926438/110513328-ae753280-8138-11eb-8b31-cb39a887cfeb.png)

![a](https://user-images.githubusercontent.com/54926438/110513370-bb922180-8138-11eb-9fdd-73e57bd007ba.png)
* ORM: 

```python
class Account(db.Model):

    username = db.Column(db.String(36))
    password = db.Column(db.String(128))
    id = db.Column(db.String(4), primary_key=True) // Khóa chính


class Student(db.Model):

    sid = db.Column(db.String(4), db.ForeignKey('account.id'), primary_key=True) // sid là khóa ngoại trỏ vào id của Account. Khóa chính
    name = db.Column(db.String(64, convert_unicode=True), nullable=False) // convert_unicode=True : Để nhận các ký tự unicode
    house = db.Column(db.String(16, convert_unicode=True), db.ForeignKey('house.name')) // house là khóa ngoại trỏ vào name của House
    dob = db.Column(db.Date)
    credit = db.Column(db.Integer)
    gpa = db.Column(db.Float)
    hobby = db.Column(db.String(128, convert_unicode=True))
    description = db.Column(db.String(512, convert_unicode=True))

    score = db.relationship('Score', backref='student') //relationship của SQLAlchemy để tiện cho việc truy xuất: các score của 1 Student
    
class Course(db.Model):

    cid = db.Column(db.String(4), primary_key=True) // Khóa chính
    name = db.Column(db.String(32, convert_unicode=True), nullable=False)
    tid = db.Column(db.String(4), db.ForeignKey('teacher.tid')) // tid là khóa ngoại trỏ vào tid của Teacher
    place = db.Column(db.String(16, convert_unicode=True))
    credit = db.Column(db.Integer)
    time = db.Column(db.String(2))
    refer = db.Column(db.String(128))

    score = db.relationship('Score', backref='course') // các score của 1 Course
    
class Score(db.Model):

    id = db.Column(db.Integer, primary_key=True) // Khóa chính
    cid = db.Column(db.String(4), db.ForeignKey('course.cid')) // cid là khóa ngoại trỏ đến cid của Course
    sid = db.Column(db.String(4), db.ForeignKey('student.sid')) // sid là khóa ngoại trỏ đến sid của Student
    mid = db.Column(db.Float)
    final = db.Column(db.Float)
    total = db.Column(db.Float)
    status = db.Column(db.Integer)
    semester = db.Column(db.String(4), nullable=False)
    
class House(db.Model):

    name = db.Column(db.String(16, convert_unicode=True), primary_key=True) // Khóa chính
    admin = db.Column(db.String(4))

    students = db.relationship('Student', backref='of_house') // các student của 1 House
    teachers = db.relationship('Teacher', backref='of_house') // các teacher của 1 House

```
## Phát triển:
1. Giải quyết vấn đề tra cứu thông tin của người khác:
* Sử dụng kỹ thuật debounce search
* Về backend, ta dùng truy vấn LIKE. LIKE trong SQLAlchemy sẽ có dạng là 
```python 
{table_name}.{column_name}.like({pattern})
```
* Vì chương trình được thực thi trên Postgresql của Heroku, Postgresql có phân biệt hoa thường nên phải dùng `or_` để tìm kiếm theo 2 trường hợp thường và viết hoa chữ cái đầu:
```python
student = db.session.query(Student).filter(or_(Student.name.like(f'%{name}%'), Student.name.like(f'%{upper_case_name}%'))).with_entities(Student.sid, Student.name)
```
* Ta chỉ lấy giá trị 2 cột sid và name `with_entities(Student.sid, Student.name)` 
* Tương tự như vậy với bảng Teacher:
```python
teacher = db.session.query(Teacher).filter(or_(Teacher.name.like(f'%{name}%'), Teacher.name.like(f'%{upper_case_name}%'))).with_entities(Teacher.tid, Teacher.name)
```
* Ta union 2 kết quả này lại và gửi lại response:
```python
array = student.union(teacher).all()
```
### Công nghệ áp dụng:
* Flask
* React.js
* Flask-Sqlalchemy
* Server backend xây dựng trên Heroku, với database URL của PostgresSQL
## Team:
