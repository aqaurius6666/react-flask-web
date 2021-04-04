import React, { useEffect, useState } from "react"
import authenticationService from '../API/authenticationService';
import courseService from "../API/courseService";
import Loading from "./loading"
import {Table} from "react-bootstrap";
import Footer from "./footer";

export const Grades = (props) => {
    const account = authenticationService.currentAccountValue()
    const [score, setScore] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        let completed = 0
        let task = 1
        const done = () => {
            if (++completed === task) {setLoading(false)}
        }
        courseService.getStudentCourse().then(({ score, total_credit }) => {
            setScore({score, total_credit})
        }).finally(done)
    }, [])
    if (loading || !score || !account) return <Loading />
    let count = 1;
    return (
        <>
            <div className="container mt-3">
                <Table responsive bordered variant="success" striped>
                    <thead >
                    <tr>
                        <td colSpan="7" className="align-content-center text-center">
                            <h4>Semester: {() => {
                                if (score[1].semester === undefined) {
                                    return null
                                } else {
                                    return score[1].semester
                                }
                            }}</h4>
                        </td>
                    </tr>
                    <tr>
                        <th>No.</th>
                        <th>Course ID</th>
                        <th>Course name</th>
                        <th>Credit</th>
                        <th>Final</th>
                        <th>Midterm</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        score.score.map((data, key) => {
                            return (
                                <tr>
                                    <td>{count++}</td>
                                    <td>{data.cid}</td>
                                    <td>{data.name}</td>
                                    <td>{data.credit}</td>
                                    <td>{data.final}</td>
                                    <td>{data.mid}</td>
                                    <td>{data.total}</td>
                                </tr>
                            )
                        })}
                    <tr>
                        <td colSpan="7"><p><strong>Credits: {score.total_credit}</strong></p></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
            <Footer />
        </>
    )
}