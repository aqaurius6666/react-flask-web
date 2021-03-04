import React, {useState} from 'react';
import {CourseList} from "../data/superData";
import {useForm} from "react-hook-form";
import Header from "./header";

const RegisCourses = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        alert("Đăng kí thành công " + JSON.stringify(data));
    };

    const courseItem = CourseList
        .map((courseItem, i) =>
            <tr className="col-12 row" >
                <td className="col-1"><input type="checkbox" ref={register} name="courses" value={courseItem.cid} /></td>
                <td className="col-1">{courseItem.cid}</td>
                <td className="col-1">{courseItem.credit}</td>
                <td className="col-4">{courseItem.name}</td>
                <td className="col-3">{courseItem.place}</td>
                <td className="col-1">{courseItem.tid}</td>
                <td className="col-1">{courseItem.time}</td>
            </tr>)

    return (
        <div className="container">
            <div>
                <div>
                    <h3><span>Course Registration</span></h3>
                </div>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <table border="1" className="row">
                <tr className="col-12 row" >
                    <td className="col-1"> </td>
                    <td className="col-1">CID</td>
                    <td className="col-1">CREDITS</td>
                    <td className="col-4">NAME</td>
                    <td className="col-3">PLACE</td>
                    <td className="col-1">TID</td>
                    <td className="col-1">TIME</td>
                </tr>
                {courseItem}
                <input className="btn btn-success" type="submit" />
            </table></form>
            <br />
        </div>
    )
}

const Courses = () => {
    const [recentCourses, setCoursesList] = useState([])

    return (
        <div className="container">
            <RegisCourses recentCourses={recentCourses} setCoursesList={setCoursesList}/>
        </div>
    )
}

export default Courses;