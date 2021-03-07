import { useContext, useEffect, useState } from "react"
import {api_get_score } from "../API/action"
import userContext from "./userContext"

export const Grades = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {user} = useContext(userContext)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [score, setScore] = useState()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        api_get_score((data)=> setScore(data))
    },[])

    if (!user) {
        return <div>You are not log in!</div>
    }


    if (score) {
        return (
            <div>
                {score.map((data, key)=> {
                    if (data.sid == user.sid) {
                        return (
                            <div>
                                <p>Course: {data.cid}</p>
                                <p>final: {data.final}</p>
                                <p>midterm: {data.mid}</p>
                                <p>total: {data.total}</p>
                            </div>
                        )
                    }

                })}
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}