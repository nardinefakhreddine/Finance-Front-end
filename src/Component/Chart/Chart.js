
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Category from '../Category';

export default class BarChartComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {},
            categories: []
        }
    }


    /* componentDidMount() {
         axios.get(`http://localhost:8000/api/yearly`)
             .then(res => {
                 const expenses = res.data;
                 let categories = [];
                 let TotalsExpenses = [];
 
                 expenses.forEach(element => {
                     categories.push(element.name);
                     TotalsExpenses.push(element.TotalsExpenses);
                 });
                 console.log(expenses);
 
             });
 
     }*/
    componentDidMount() {
        var year = "";
        var category = [];
        var datasets = [];
        axios.get(`http://localhost:8000/api/yearly`).then(res => {
            const expenses = res.data;

            var newcolors = ["rgba(255,105,145,0.6)", "rgba(155,100,210,0.6)", "rgba(90,178,255,0.6)", "rgba(240,134,67,0.6)", "rgba(120,120,120,0.6)"];
            for (let i = 0; i < expenses.length; i++) {
                var values = [];

                for (let j = 0; j < expenses[i].length; j++) {
                    if (expenses[i].length != 0) {

                        values.push(expenses[i][j].TotalsExpenses)
                        year = expenses[i][j].year

                    }

                }
                if (expenses[i].length != 0) {
                    datasets.push(
                        {
                            label: year,
                            data: values,
                            strokeWidth: 2,
                            backgroundColor: [
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i],
                                newcolors[i]

                            ]




                        },

                    )
                }
            }
        });
        console.log(datasets);
        axios
            .get(
                "http://localhost:8000/api/getexp",

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.adminsToken} `
                    }
                }
            )
            .then(res => {
                console.log(res.data[0].category)
                var data = res.data
                for (let i = 0; i < data.length; i++) {
                    category.push(data[i].category.name)
                }
                let uniqueChars = category.filter((c, index) => {
                    return category.indexOf(c) === index;
                });
                console.log(uniqueChars);
                this.setState({
                    Data: {
                        labels:
                            uniqueChars,
                        datasets: datasets
                    }
                });

            })
            .catch(err => {
                console.log(err);
            });
        console.log(category)






        console.log(this.state.Data)
    }
    render() {



        return (
            <div>
                <Bar
                    data={this.state.Data}
                    options={{ maintainAspectRatio: false }} />
            </div >

        )
    }
}
// $month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];