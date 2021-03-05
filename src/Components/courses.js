import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { courseService } from '../API/service';
import Loading from './loading';


const RegisCourses = (props) => {
    const {coursesList} = props
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        courseService.registerCourse(data)
        alert("Successfully!")
    };

    const courseItem = coursesList
        .map((courseItem, i) =>
            <tr className="col-12 row" key={i} >
                <td className="col-1"><input type="checkbox" ref={register} name="array" value={courseItem.cid} /></td>
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