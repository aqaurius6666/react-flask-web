import React, {Component, useEffect, useState} from 'react';
import courseService from "../API/courseService";
import {Bar} from "react-chartjs-2";

const state = {
    labels: ['0', '1', '2', '3',
        '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
        {
            label: 'number of student',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [1, 0, 0, 0, 0, 5, 10, 4, 5, 2, 1],
        }
    ]
}

const fetchData = () => {
    const url = `https://it-must-be-ok.herokuapp.com/`
}

export default class Graph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            grades: []
        }
    }

    render() {
        if (this.props.show === '')
            return(
                <div>

                </div>
            )
        else
            return (
            <div>
                <Bar
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'Scores Range Course ' + this.props.show,
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        );
    }
}