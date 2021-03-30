import { useEffect, useState } from "react"
import courseService from "../API/courseService"

const Controller = () => {
    const [byCourse, setByCourse] = useState()
    const [byHouse, setByHouse] = useState()
    const [isShow, setIsShow] = useState(false)
    const [courses, setCourses] = useState([])
    useEffect(() => {
        courseService.getCourses().then(({array}) => {
            setCourses(array)
        })
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault()
        
    }
    return (
        <form>
            <title>By House</title>
            <select name="house" onChange={(e) => {setByHouse(e.target.value)}}>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Gryffindor">Gryffindor</option>
                <option value="Teacher">Teacher</option>
            </select>
            <title>By Course</title>
            <select name="course" onChange={(e) => {setByCourse(e.target.value)}}>
                {courses.map((each, key) => {
                    return (
                        <option value={each.cid} id={key}>{`${each.name} ${each.cid}`}</option>
                    )
                })}
            </select>
        </form>
    )
}; export default Controller