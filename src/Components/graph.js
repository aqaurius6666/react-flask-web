import React, { useEffect, useState } from "react"
import courseService from "../API/courseService"
import Graph from "./chart";
import Footer from "./footer";

const FilterGraph = (props) => {
    const { data, setData } = props
    console.log(data)
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
        setData({
            course: byCourse,
            house: byHouse,
            isShow: true
        })

    }
    return (
        <form onSubmit={onSubmitForm} className=" container mt-4 mb-3">
            <div className="mb-2 col-12 col-md-5">
                <label>By House</label>
                <select className="form-control" name="house" defaultValue="all" onChange={(e) => { setByHouse(e.target.value) }}>
                    <option selected="all">All</option>

                    <option value="Gryffindor">Gryffindor</option>
                    <option value="Hufflepuff">Hufflepuff</option>
                    <option value="Slytherin">Slytherin</option>
                    <option value="Ravenclaw">Ravenclaw</option>
                </select>
            </div>
            <div className="mb-2 col-12 col-md-5">
                <label>By Course</label>
                <select className="form-control" name="course" onChange={(e) => { setByCourse(e.target.value) }}>
                    <option selected="all">All</option>

                    {courses.map((each, key) => {
                        return (
                            <option value={each.cid} id={key}>{`${each.name} ${each.cid}`}</option>
                        )
                    })}
                </select>
            </div>
            <button type="submit" className="btn btn-primary ml-3 mt-2">
                Enter
            </button>
            <hr />
        </form>
    )
};

const GraphPage = () => {
    const [data, setData] = useState({
        'course': "all",
        'house': "all",
        'isShow': false
    })

    return (
        <>
            <div className="mt-4 container body_font">
                <h1><i className="fa fa-stack-overflow" aria-hidden="true" /> Statistics</h1>
                <FilterGraph data={data} setData={setData} />
                {data.isShow && <Graph data={data} />}
            </div>
            <Footer />
        </>
    )
}; export default GraphPage