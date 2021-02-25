import React, { useContext, useEffect, useState } from "react"
import { api_get_student } from "../API/action"
import userContext from "./userContext"
import Footer from "./footer";
import houseImages from "../data/houseImages";
import envURL from "../data/characterImages";

<<<<<<< HEAD
const checkHouse = (house) => {
    switch(house) {
        case 'Gryffindor':
            return 'Gryffindor'
        case 'Slytherin':
            return 'Slytherin'
        case 'Hufflepuff':
            return 'Hufflepuff'
        case 'Ravenclaw':
            return 'Ravenclaw'
=======
const checkHouseImg = (house) => {
    switch(house) {
        case 'Gryffindor':
            return houseImages[0]
        case 'Slytherin':
            return houseImages[1]
        case 'Hufflepuff':
            return houseImages[2]
        case 'Ravenclaw':
            return houseImages[3]
>>>>>>> 51965db620659b0ddef6992bddf465df9b0f5377
        default:
            return houseImages[2]
    }
}

<<<<<<< HEAD
const checkHouseImg = (house) => {
    switch(house) {
        case 'Gryffindor':
            return Gryffindor
        case 'Slytherin':
            return Slytherin
        case 'Hufflepuff':
            return Hufflepuff
        case 'Ravenclaw':
            return Ravenclaw
        default:
            return Hufflepuff
    }
=======
const findCharacterImage = (name) => {
    let URL = name.toLowerCase().replace(/\s/g, '')
    return `${envURL}/${URL}.jpg`
>>>>>>> 51965db620659b0ddef6992bddf465df9b0f5377
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

export const Info = () => {
    const {user} = useContext(userContext)
    
    const [student, setStudent] = useState()
    
    useEffect(() => {
        api_get_student((data) => setStudent(data))
    },[])
    if (!user) {
        return <div>You are not log in!</div>
    }
    if (student) {
<<<<<<< HEAD
=======
        console.log(student)
>>>>>>> 51965db620659b0ddef6992bddf465df9b0f5377
        let house_img = checkHouseImg(student.house)
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
                            <th className="col-6 col-md-3 col-lg-2">
                                <img className="student_image"
                                     src={findCharacterImage(student.name)}
                                     alt="student" />
                            </th>
                            <th className="col-6 col-md-6 col-lg-8">
                                <h5>Student's ID: {student.sid}</h5>
                                <h5>Full Name: {student.name}</h5>
                                <h5>Date of Birth: {student.dob}</h5>
<<<<<<< HEAD
                                <h5>House: {checkHouse(student.house)}</h5>
=======
                                <h5>House: {student.house}</h5>
>>>>>>> 51965db620659b0ddef6992bddf465df9b0f5377
                                <h5>GPA: {student.gpa}</h5>
                                <h5>Credit: {student.credit}</h5>
                            </th>
                            <th className="col-lg-2 d-none d-sm-inline">
                                <img className="student_image" src={house_img} alt="house" />
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
