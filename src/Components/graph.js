import { useEffect, useState } from "react"
import courseService from "../API/courseService"
import Graph from "./chart";

const FilterGraph = (props) => {
    const {setData} = props
    const [byCourse, setByCourse] = useState(String)
    const [byHouse, setByHouse] = useState(String)
    const [courses, setCourses] = useState(Array)
    useEffect(() => {
        courseService.getCourses().then(({ array }) => {
            setCourses(array)
        })
    }, [])
    const onSubmitForm = (e) => {
        e.preventDefault()
        setData({course : byCourse,
                house: byHouse,
                isShow: true
        })

    }
    return (
        <form onSubmit={onSubmitForm}>
            <div>
                <label>By House</label>
                <select name="house" onChange={(e) => { setByHouse(e.target.value) }}>
                    <option value="all" selected>All</option>
                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                </select>
            </div>
            <div>
                <label>By Course</label>
                <select name="course" onChange={(e) => { setByCourse(e.target.value) }}>
                    <option value="all" id="all" selected>All</option>

                    {courses.map((each, key) => {
                        return (
                            <option value={each.cid} id={key}>{`${each.name} ${each.cid}`}</option>
                        )
                    })}
                </select>
            </div>
            <button type="submit">
                    Enter
                </button>
        </form>
    )
}; 

const GraphPage = () => {
    const [data, setData] = useState({
        'course' : String,
        'house' : String,
        'isShow' : Boolean
    })
    return (
        <>
        <FilterGraph setData={setData}/>
        {data.isShow && <Graph data={data}/>}
        </>
    )
}; export default GraphPage