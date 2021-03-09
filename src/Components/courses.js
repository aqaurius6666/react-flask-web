import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { courseService } from '../API/service';
import Loading from './loading';
import {checkHaveCourse} from "../data/superData";
import history from "../history"

const RegisCourses = (props) => {
    const {coursesList} = props
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        courseService.registerCourse(data)
        alert("Successfully!")
        history.push('/info')
    };
    const [allCourse, setAllCourse] = useState([])
    useEffect(() => {
        courseService.getStudentCourse()
            .then(({score}) => {
                setAllCourse(score.map(score => score.cid))
            })
    }, [])


    const courseItem = coursesList
        .map((courseItem, i) =>
            <tr className="col-12 row" key={i} >
                <td className="col-1"><input type="checkbox" ref={register}
                                             disabled={checkHaveCourse(allCourse, courseItem)}
                                             name="array" value={courseItem.cid} /></td>
                <td className="col-2 col-md-1">{courseItem.cid}</td>
                <td className="d-sm-block d-none col-1 col-md-1">{courseItem.credit}</td>
                <td className="col-4 col-md-4">{courseItem.name}</td>
                <td className="col-3 col-md-3">{courseItem.place}</td>
                <td className="d-sm-block d-none col-1 col-md-1">{courseItem.tid}</td>
                <td className="col-2 col-md-1">{courseItem.time}</td>
            </tr>)

    return (
        <div className="container">
            <div>
                <div>
                    <br />
                    <h3><span>Course Registration</span></h3>
                </div>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <table border="1" className="row">
                    <tr className="col-12 row" >
                        <td className="col-1"> </td>
                        <td className="col-2 col-md-1">CID</td>
                        <td className="d-sm-block d-none col-1 col-md-1">CREDITS</td>
                        <td className="col-4 col-md-4">NAME</td>
                        <td className="col-3 col-md-3">PLACE</td>
                        <td className="d-sm-block d-none col-md-1">TID</td>
                        <td className="col-2 col-md-1">TIME</td>
                    </tr>
                    {courseItem}
                    <button style={{margin:'10px'}} className="btn btn-success" type="submit">Submit</button>
                </table></form>
            <br />
        </div>
    )
}

const Courses = () => {
    const [coursesList, setCoursesList] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
        courseService.getCourses().then(({ array }) => {
            setCoursesList(array)
        }).then(() => setLoading(false))
        .catch(() => setLoading(false))
        return () => setLoading(false)
    }, [])
    if (loading) {
        return (
            <Loading/>
        )
    }
    return (
        <div className="container">
            <RegisCourses coursesList={coursesList}/>
        </div>
    )

}

export default Courses;