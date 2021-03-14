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
