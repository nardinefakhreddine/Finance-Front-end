import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './Expense.css';

class EditExpense extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            amount: '',
            status: 1,//1 fixed 0 reccurent
            currency: 'dollar',
            date: '',
            startdate: '',
            enddate: '',
            category_id: 0,
            categories: [],
            disabled: false,
            errorName: '',
            errorDescription: '',
            alert_message1: '',
            alert_message2: '',

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
    }





    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,


        })

    }
    handlefixed = (e) => {
        this.setState({
            status: 1

        })

    }
    handlereccurent = (e) => {

        this.setState({
            status: 0,
            disabled: true,

        })


    }

    componentDidMount() {

    }









    render() {
        const date = <div id="reccurent-date">
            <div className="form-group">
                start date
        <input type="date"
                    name="startdate"
                    onChange={this.handleInputChange}
                    value={this.state.date}
                    className="form-control"
                    placeholder="StartDate" />
            </div>
            <div className="form-group">
                end date
        <input type="date"
                    name="enddate"
                    onClick={this.handleInputChange}
                    value={this.state.date}
                    className="form-control"
                    placeholder="End" />
            </div>
        </div>
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Edit Fixed Expense</div>
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
                                        placeholder="date of expense"
                                        disabled={this.state.disabled ? 'disabled' : null} />
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

                                <div className="radio-buttons form-group">


                                    <input
                                        name="st"
                                        type="radio"
                                        value="fixed"
                                        defaultChecked
                                        onChange={this.handlefixed}
                                    />  &nbsp;fixed &nbsp; &nbsp;
                    <input
                                        name="st"
                                        type="radio"
                                        value="reccurent"
                                        onClick={this.handlereccurent}

                                    />  &nbsp;reccurent



            </div>
                                {this.state.status == 0 ? date : null}
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
export default EditExpense;