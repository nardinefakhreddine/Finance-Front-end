import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AddIncome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            amount: '',
            status: 1,
            currency: 'dollar',
            category_id: 1,
            date: null,

            categories: [],
            errortitle: '',
            errorDescription: '',
            alert_message1: '',
            alert_message2: ''
        }
    }

    //Get All categories For Expenses
    componentDidMount() {
        axios
            .get(
                "http://localhost:8000/api/income-sources",

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
    handleInputSource = (event) => {
        this.setState({
            category_id: event.target.value,


        })
        console.log(this.state);
    }




    //Insert EXpense
    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/AddIncome',
            {
                title: this.state.title,
                description: this.state.description,
                status: this.state.status,
                amount: this.state.amount,
                source_id: this.state.category_id,
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
            this.props.history.push('/Incomes');
        }
        ).catch(error => {
            console.log(error.response.data)
        });





    }



    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Fixed Income</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        name="title"
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="Enter title" />
                                    <i style={{ color: "red", fontSize: '10px' }}>{this.state.errortitle ? this.state.errortitle : null}</i>
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        name="description"
                                        onChange={this.handleInputChange}
                                        value={this.state.description}
                                        className="form-control"
                                        placeholder="Description" />
                                    <i style={{ color: "red", fontSize: '10px' }}>{this.state.errordescription ? this.state.errordescription : null}</i>
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        name="amount"
                                        onChange={this.handleInputChange}
                                        value={this.state.amount}
                                        className="form-control"
                                        placeholder="Amount in dollar" />
                                    <i style={{ color: "red", fontSize: '10px' }}>{this.state.erroramount ? this.state.erroramount : null}</i>

                                </div>
                                <div className="form-group">
                                    <input type="date"
                                        name="date"
                                        onChange={this.handleInputChange}
                                        value={this.state.date}
                                        className="form-control"
                                        placeholder="date of expense" />
                                    <i style={{ color: "red", fontSize: '10px' }}>{this.state.errordate ? this.state.errordate : null}</i>
                                </div>
                                <div class="form-group col-md-14">

                                    <select id="categoryid" name="category_id" onChange={this.handleInputSource} class="form-control">
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
export default AddIncome;