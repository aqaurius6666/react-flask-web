import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import courseService from "../API/courseService";


const Graph = (props) => {
    const { course, house } = props
    const [data, setData] = useState()

    useEffect(() => {
            courseService.getGraph(course, house).then(({label, data}) => {
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
    }, [])
    return (
        <div>
            <Bar
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Scores Range Course ' + course,
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

