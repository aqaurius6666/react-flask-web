import React, { useContext, useEffect, useState } from "react"
import Footer from "./footer";
import houseImages from "../data/houseImages";
import envURL from "../data/characterImages";
import Loading from "./loading";
import { courseService, userService } from "../API/service";
import { loadingContext } from "./loadingContext";
import { checkCID, checkSID } from "../data/superData";

const checkHouseImg = (house) => {
    switch (house) {
        case 'Gryffindor':
            return houseImages[0]
        case 'Slytherin':
            return houseImages[1]
        case 'Hufflepuff':
            return houseImages[2]
        case 'Ravenclaw':
            return houseImages[3]
        default:
            return houseImages[2]
    }
}

const findCharacterImage = (name = "Unknown") => {
    if (name === "") return `${envURL}/Unknown1.jpg`
    let URL = name.replace(/\s/g, '%20')
    return `${envURL}/${URL}1.jpg`
}

const Subject = ({ props }) => {
    return (
        <tr className="col-12 row text-center">
            <td className="col-3">
                <p>{props.name}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{props.cid}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.credit}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{checkSID(checkCID(props.cid).tid).name}</p>
            </td>
            <td className="col-3">
                <p>{checkCID(props.cid).place}</p>
            </td>
        </tr>
    )
}

export const Info = () => {
    const [student, setStudent] = useState(userService.currentUserValue())
    const [loading, setLoading] = useState(true)
    const [allCourse, setAllCourse] = useState([])
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            setStudent(data)
        })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)

    }, [])
    useEffect(() => {
        setLoading(true)
        courseService.getStudentCourse()
            .then(({score}) => {
                setAllCourse(score.map((item, i) => <Subject key={i} props={item} />))
                
            })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)

    }, [])

    if (loading || !student || !allCourse) return <Loading />
    else {
        return (
            <div>
                <br /> <br />
                <div className="container header text-center body_font">
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

                            </th>
                            <th className="col-lg-2 d-none d-sm-inline">
                                <img className="student_image" src={checkHouseImg(student.house)} alt="house" />
                            </th>
                        </tr>
                        <tr className="col-12 row text-center">
                            <td className="col-3">
                                <h4>Môn học</h4>
                            </td>
                            <td className="col-3 col-md-2">
                                <h4>Mã môn học</h4>
                            </td>
                            <td className="d-none d-sm-block col-md-2">
                                <h4>Số tín</h4>
                            </td>
                            <td className="col-3 col-md-2">
                                <h4>Giáo viên</h4>
                            </td>
                            <td className="col-3">
                                <h4>Phòng học</h4>
                            </td>
                        </tr>

                        {allCourse}
                    </table>
                </div>
                <br />
                <Footer />
            </div>
        )
    }

}
