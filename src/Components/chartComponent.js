import React, {useEffect, useRef, useState}  from 'react';
import Chartjs from 'chart.js/dist/Chart';

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

export const fetchData = (course) => {
    const url = `http://127.0.0.1:5000/api/graph?course=${course}`
    const requestOptions = {
        method : 'GET'
    }
    return fetch(url, requestOptions).then(data => {
        
        return data.json()
    }
    )
}


const BarChart = () => {
    const chartContainer = useRef(null)
    const [chartInstance, setChartInstance] = useState(null)

    useEffect(() => {

        if (chartContainer && chartContainer.current) {
            //const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
            //setChartInstance(newChartInstance);
        }
    }, [chartContainer]);

    return (
        <div>
            <canvas ref={chartContainer} />
        </div>
    );
}

export default BarChart;