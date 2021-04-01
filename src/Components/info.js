import React, { useEffect, useState } from "react"
import Footer from "./footer";
import { findCharacterImage, checkHouseImg, formatTime } from '../data/superData'
import Loading from "./loading";
import { checkCID, checkSID } from "../data/superData";
import { Grades } from "./grades";
import userService from "../API/userService";
import courseService from "../API/courseService";
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import history from "../history";
import { getAllStudent, getAllTeacher } from "../API/service";
import authenticationService from "../API/authenticationService";
import { MydModalWithGrid } from "./DialogModal";
import deleteIcon from '../img/icons8-delete-bin-64.png';
import detailIcon from '../img/icons8-view-details-64.png';
import {NavLink} from "react-bootstrap";

const Subject = ({ props }) => {
    const [modalShow, setModalShow] = useState(false);
    return (
        <tr className="col-12 row text-center">
            <td className="col-4 col-md-3">
                <p>{props.name}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.cid}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.credit}</p>
            </td>
            <td className="col-4 col-md-3">
                <p>{checkSID(checkCID(props.cid).tid).name}</p>
            </td>
            <td className="col-4 col-md-2">
                <button style={{
                    border: "2px solid white",
                    borderRadius: "25px"
                }} onClick={() => {
                    if (window.confirm('Sure want to delete?')) {
                        courseService.deleteCourse(props.cid)
                            .then(() => window.location.reload())
                            .catch(() => alert("You can't cancel this course!"))
                    }
                }}><img src={deleteIcon} alt="X" width="20px" height="auto" /></button>
                <span> </span>
                <button style={{
                    border: "2px solid white",
                    borderRadius: "25px"
                }} onClick={() => setModalShow(true)}>
                    <img src={detailIcon} alt="i" width="20px" height="auto" />
                </button>
                <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} value={props} />
            </td>
        </tr>
    )
}


const handleOnSearch = (string, results) => {
    console.log("Search")
    console.log(string, results)
}

const handleOnSelect = (item) => {
    history.push(`/info/${item.id}`)
    window.location.reload();
    console.log(item)
}

const handleOnFocus = () => {
    console.log('Focused')
}

export const Info = (props) => {
    const { isTeacher, id } = props
    const [teacherSubject, setSubject] = useState([])
    const [student, setStudent] = useState()
    const [allStudent, setAllStudent] = useState([])
    const [loading, setLoading] = useState(true)
    const [allCourse, setAllCourse] = useState([])

    useEffect(() => {
        let completed = 0
        let task = 4
        setLoading(true)
        const done = () => {
            if (++completed === task) { setLoading(false) }
        }
        userService.getUserValueById(id).then(data => {
            setStudent(data)
        }).finally(done)
        courseService.getStudentCourseById(id)
            .then(({ score }) => {
                setAllCourse(score.map((item, i) => <Subject key={i} props={item} />))
            }).finally(done)
        getAllStudent()
            .then((data) => {
                setAllStudent(data.array.map((item) => (
                    {id: item.sid,
                    name: item.name}
                )))
            }).finally(done)
        courseService.getCourseTeaching()
            .then(({courses}) => {
                setSubject(courses)
                setAllCourse(courses.map((item, i) => <Subject key={i} props={item} />))
            }).finally(done)
    }, [id])

    // useEffect(() => {
    //     setLoading(true)
    //     if (1) {
    //         courseService.updateScore('DEF0', [])
    //             .then(() => setLoading(false))
    //             .catch(() => setLoading(false))
    //     }
    //     return () => setLoading(false)
    // }, [])

    if (loading || !student || !allCourse || !allStudent) return <Loading />
    else {
        return (
            <div className="mt-4">
                <div className="container header text-center body_font">
                    <i className="fa fa-user" aria-hidden="true" />
                    {(isTeacher || student.role === 'Teacher') ?
                        (<div style={{ width: '380px' }}>
                            <ReactSearchAutocomplete
                                items={allStudent}
                                onSearch={handleOnSearch}
                                onSelect={handleOnSelect}
                                onFocus={handleOnFocus}
                                autoFocus
                                placeholder="Full Name"
                                maxResults={2}
                                inputDebounce={500}
                            />
                        </div>) : (<></>)
                    }
                    <h3>{student.role === 'Student'
                        ? `Student` : `Teacher`}'s Infomation</h3>
                    <hr />
                </div>
                <div className="container body_font">
                    <table className="row" border="2" cellPadding="15" cellSpacing="0">
                        <tr className="col-12 row">
                            <th className="col-6 col-md-3 col-lg-2">
                                <img className="student_image"
                                    src={findCharacterImage(student.name)}
                                    alt="student" />
                            </th>
                            <th className="col-6 col-md-6 col-lg-8">
                                <h5>{student.role === 'Student'
                                    ? `Student` : `Teacher`}'s ID:
                                    {student.role === 'Student'
                                        ? student.sid : student.tid}</h5>
                                <h5>Full Name: {student.name}</h5>
                                <h5>Date of Birth: {student.dob}</h5>
                                <h5>House: {student.house}</h5>
                                <h5>{student.role === 'Student'
                                    ? `GPA: ${student.gpa}` : ''}</h5>
                                <h5>{student.role === 'Student'
                                    ? `Credit: ${student.credit}` : ''}</h5>
                                <h5>{student.role === 'Teacher'
                                    ? `Teach: ${teacherSubject.map(item => item.name).join(',')}` : ''}</h5>

                            </th>
                            <th className="col-lg-2 d-none d-sm-inline">
                                <img className="student_image" src={checkHouseImg(student.house)} alt="house" />
                            </th>
                        </tr>
                        <tr className="col-12 row text-center">
                            <td className="col-4 col-md-3">
                                <h4>Subject</h4>
                            </td>
                            <td className="d-none d-sm-block col-md-2">
                                <h4>Code</h4>
                            </td>
                            <td className="d-none d-sm-block col-md-2">
                                <h4>Credits</h4>
                            </td>
                            <td className="col-4 col-md-3">
                                <h4>Teacher</h4>
                            </td>
                            <td className="col-4 col-md-2">
                                <h4>Action</h4>
                            </td>
                        </tr>
                        {allCourse}
                    </table>
                </div>
                <br />
                {id === authenticationService.getId() && student.role === "Student" &&
                    <div className="row">
                        <a className="btn btn-info offset-4 col-4" href={"/info/score"}
                            component={() => <Grades />}>Results</a>
                    </div>
                }
                <Footer />
            </div>
        )
    }
}