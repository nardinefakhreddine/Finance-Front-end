import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AddExpense extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            amount: '',
            status: 1,
            currency: 'dollar',
            category_id: 0,
            date: null,

            categories: [],
            errorName: '',
            errorDescription: '',
            alert_message1: '',
            alert_message2: ''
        }
    }

    //Get All categories For Expenses
    componentDidMount() {
        axios
            .get(
                "http://localhost:8000/api/categories",

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.adminsToken}`
                    }
                }
            )
            .then(res => {

                this.setState({
                    categories: res.data.data
                }
                )
            })
            .catch(err => {
                console.log(err);
            });
    };





    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,


        })
        console.log(this.state);
    }


    //Insert EXpense
    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/AddExpense',
            {
                title: this.state.title,
                description: this.state.description,
                status: this.state.status,
                amount: this.state.amount,
                category_id: this.state.category_id,
                currency: this.state.currency,
                date: this.state.date,


            },
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }
        ).then(response => {
            this.setState({
                title: '',
                description: '',
                amount: '',
                status: 1,
                currency: 'dollar',
                category_id: 0,
                date: null,
                categories: [],

            })
            this.props.history.push('/Expenses');
        }
        ).catch(error => { console.log(error.response) });

        /*console.log(error.response.data.message)
        console.log(error.response.data)
        if (error.response.data.errors.name !== "undefined" && error.response.data.errors.description !== "undefined") {
            this.setState({
                alert_message1: error.response.data.errors.description,
                alert_message2: error.response.data.errors.name,
            })
        }
        else if (error.response.data.errors.description !== "undefined") {
            this.setState({
                alert_message1: error.response.data.errors.description,

            })


        } else if (error.response.data.errors.name !== "undefined") {
            this.setState({
                alert_message2: error.response.data.errors.name,
            })
        }
*/




    }

    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Fixed Expense</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        name="title"
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="Enter title" />

                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        name="description"
                                        onChange={this.handleInputChange}
                                        value={this.state.description}
                                        className="form-control"
                                        placeholder="Description" />

                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        name="amount"
                                        onChange={this.handleInputChange}
                                        value={this.state.amount}
                                        className="form-control"
                                        placeholder="Amount in dollar" />
                                </div>
                                <div className="form-group">
                                    <input type="date"
                                        name="date"
                                        onChange={this.handleInputChange}
                                        value={this.state.date}
                                        className="form-control"
                                        placeholder="date of expense" />
                                </div>
                                <div class="form-group col-md-14">

                                    <select id="categoryid" name="category_id" onChange={this.handleInputChange} class="form-control">
                                        {
                                            this.state.categories !== null
                                                ? this.state.categories.map(category => (

                                                    <option name="category_id" key={category.id}
                                                        value={category.id} selected >{category.name}</option>
                                                )) :
                                                null

                                        }

                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        );
    }
}
export default AddExpense;