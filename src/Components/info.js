import React, { useContext, useEffect, useState } from "react"
import { api_get_student } from "../API/action"
import userContext from "./userContext"
import harry from '../img/harry.jpg'
import Gryffindor from "../img/Gryffindor.png"
import Hufflepuff from "../img/Hufflepuff.png"
import Slytherin from "../img/Slytherin.png"
import Ravenclaw from "../img/Ravenclaw.png"
import Footer from "./footer";

const checkHouse = (house_id) => {
    switch(house_id) {
        case '1000':
            return 'Gryffindor'
        case '1001':
            return 'Slytherin'
        case '1002':
            return 'Hufflepuff'
        case '1003':
            return 'Ravenclaw'
        default:
            return 'Hufflepuff'
    }
}

const checkHouseImg = (house_id) => {
    switch(house_id) {
        case '1000':
            return Gryffindor
        case '1001':
            return Slytherin
        case '1002':
            return Hufflepuff
        case '1003':
            return Ravenclaw
        default:
            return Hufflepuff
    }
}

const Subject = (props) => {
    return (
        <tr className="col-12 row text-center">
            <td className="col-3">
                <p>{props.sname}</p>
            </td>
            <td className="col-2 text-center">
                <p>{props.sid}</p>
            </td>
            <td className="col-2 text-center">
                <p>{props.tinchi}</p>
            </td>
            <td className="col-2 text-center">
                <p>{props.teacher}</p>
            </td>
            <td className="col-3 text-center">
                <p>{props.address}</p>
            </td>
        </tr>
    )
}
export const Info = (props) => {
    const {user} = useContext(userContext)
    
    const [student, setStudent] = useState()
    
    useEffect(() => {
        api_get_student((data) => setStudent(data))
    },[])
    if (!user) {
        return <div>You are not log in!</div>
    }
    if (student) {
        let house_img = checkHouseImg(student.hid)
        return (
            <div>
                <br /> <br />
                <div className="container header text-center">
                    <h3>Student's Information</h3>
                    <hr />
                </div>
                <div>
                    <table className="row" border="2" cellPadding="15" cellSpacing="0">
                        <tr className="col-12 row">
                            <th className="col-6 col-md-2">
                                <img className="student_image" src={harry} alt="student's image" />
                            </th>
                            <th className="col-6 col-md-8">
                                <h5>Full Name: {student.name}</h5>
                                <h5>Date of Birth: {student.dob}</h5>
                                <h5>House: {checkHouse(student.hid)}</h5>
                                <h5>GPA: {student.gpa}</h5>
                                <h5>Credit: {student.credit}</h5>
                            </th>
                            <th className="col-2 d-none d-sm-inline">
                                <img className="student_image" src={house_img} alt="house's image" />
                            </th>
                        </tr>
                        <tr className="col-12 row text-center">
                            <td className="col-3">
                                <h4>Môn học</h4>
                            </td>
                            <td className="col-2 text-center">
                                <h4>Mã môn học</h4>
                            </td>
                            <td className="col-2 text-center">
                                <h4>Số tín</h4>
                            </td>
                            <td className="col-2 text-center">
                                <h4>Giáo viên</h4>
                            </td>
                            <td className="col-3 text-center">
                                <h4>Phòng học</h4>
                            </td>
                        </tr>

                        <Subject sname="Phòng chống nghệ thuật hắc ám" sid="PCNTHA1"
                                 tinchi="3" teacher="Severus Snape" address="101-Slytherin" />
                        <Subject sname="Bùa Chú" sid="BC1" tinchi="3"
                                 teacher="Albus Dumbledore" address="101 Gryffindor" />
                    </table>
                </div>
                <br />
                <Footer />
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
