import React, {useEffect, useState} from 'react';
import courseService from "../API/courseService";
import {Bar} from "react-chartjs-2";

const Graph = (props) => {
    const { show, tra } = props
    const [data, setData] = useState()

    useEffect(() => {
        if (show !== "") {
            courseService.getGraphByCourse(show).then(({label, data}) => {
                setData({
                    labels: label,
                    datasets: [
                        {
                            label: 'number of student',
                            fill: false,
                            lineTension: 1,
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: data,
                        }
                    ]
                })
            })
        }
    }, [show])
    return show === "" ? (<></>) :(
        <div>
            <Bar
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Scores Range Course ' + show,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </div>
    )
}; export default Graph

