//PieChartComponent.js

import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';

export default class PieChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {}
        }
    }

    componentDidMount() {
        /* axios.get(`http://localhost:8000/api/charts`)
             .then(res => {
                 const football = res.data;
                 let playername = [];
                 let playerscore = [];
                 football.forEach(element => {
                     playername.push(element.name);
                     playerscore.push(element.score);
                 });*/
        this.setState({
            Data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'Champions League 2017/2018 Top Scorer',
                        data: [20, 45, 28, 80, 99, 43],
                        strokeWidth: 2,
                        backgroundColor: [
                            'rgba(255,105,145,0.6)',
                            'rgba(155,100,210,0.6)',
                            'rgba(90,178,255,0.6)',
                            'rgba(240,134,67,0.6)',
                            'rgba(120,120,120,0.6)',
                            'rgba(250,55,197,0.6)'
                        ]
                    }
                ]
            }
        });

    }
    render() {
        return (
            <div>
                <Pie
                    data={this.state.Data}
                    options={{ maintainAspectRatio: false }} />
            </div>
        )
    }
}