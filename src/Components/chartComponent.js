import React, {Component} from 'react';
import Chartjs from 'chart.js/dist/Chart';
import {Bar} from 'react-chartjs-2';
import {useEffect, useRef, useState} from "react/cjs/react.production.min";

const chartConfig ={
    type: 'bar',
    data: {
        dataset: [
            {
                course: null,
                score: null
            }
        ]
    },
    option: {

    }
}

const fetchData = () => {
    const url = `https://it-must-be-ok.herokuapp.com/`
}


function BarChart() {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
}

export default BarChart;