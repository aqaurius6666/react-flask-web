import { useEffect, useState } from "react"
import { authenticationService, courseService } from "../API/service"
import Loading from "./loading"

export const Grades = (props) => {
    const account = authenticationService.currentAccountValue()
    const [score, setScore] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        courseService.getStudentCourse().then(({ score }) => {
            setScore(score)
        })
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => setLoading(false)
    }, [])
    //console.log(score)
    if (loading || !score || !account) return <Loading />
    return (
        <div>
            {score.map((data, key) => {
                return (
                    <div>
                        <p>Course: {data.cid}</p>
                        <p>final: {data.final}</p>
                        <p>midterm: {data.mid}</p>
                        <p>total: {data.total}</p>
                    </div>
                )
            })}
        </div>
    )

}