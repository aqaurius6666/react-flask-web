import React, { useContext, useEffect, useState } from "react"
import Footer from "./footer";
import houseImages from "../data/houseImages";
import envURL from "../data/characterImages";
import Loading from "./loading";
import { userService } from "../API/service";
import { loadingContext } from "./loadingContext";

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
    if(name === "") return `${envURL}/Unknown1.jpg`
    let URL = name.replace(/\s/g, '%20')
    return `${envURL}/${URL}1.jpg`
}

const Subject = (props) => {
    return (
        <tr className="col-12 row text-center">
            <td className="col-3">
                <p>{props.sname}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{props.sid}</p>
            </td>
            <td className="d-none d-sm-block col-md-2">
                <p>{props.tinchi}</p>
            </td>
            <td className="col-3 col-md-2">
                <p>{props.teacher}</p>
            </td>
            <td className="col-3">
                <p>{props.address}</p>
            </td>
        </tr>
    )
}

export const Info = () => {
    const [student, setStudent] = useState(userService.currentUserValue())
    const { setLoading } = useContext(loadingContext)
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            setStudent(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    if (student) {
        let house_img = checkHouseImg(student.house)
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
                                <img className="student_image" src={house_img} alt="house" />
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
        return <Loading />
    }
}
