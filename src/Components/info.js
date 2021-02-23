import { useContext, useEffect, useState } from "react"
import { api_get_student } from "../API/action"
import userContext from "./userContext"
import {ChangePassword} from "./change_password";


export const Info = (props) => {
    const {isLogin} = useContext(userContext)
    
    const [student, setStudent] = useState()
    
    useEffect(() => {
        api_get_student(({student}) => setStudent(student))
    },[])
    if (!isLogin) {
        return <div>You are not log in!</div>
    }
    if (student) {
        return (
            <div>
                <br /> <br />
                <div>Name: {student.name}</div>
                <div>DoB: {student.dob}</div>
                <div>House: {student.hid}</div>
                <div>GPA: {student.gpa}</div>
                <div>Credit: {student.credit}</div>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}
