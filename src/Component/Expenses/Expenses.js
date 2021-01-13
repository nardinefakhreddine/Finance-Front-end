import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';

import Navbar from '../NavBar';
import { Confirm } from 'react-st-modal';
class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: '',
            status: 'fixed',
            route: 'Expenses'
        }
    }

    handleChangefixed = (event) => {
        this.setState({
            status: 'fixed',

        })
        const route = 'Expenses';
        axios.get('http://localhost:8000/api/' + route, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }).then(response => {
            this.setState({
                expenses: response.data.data
            }
            )
            console.log(this.state);
        }).catch(error => console.log(error.response));

    }
    handleChangeRec = (event) => {
        this.setState({
            status: 'reccurent',

        })
        const route = 'ReccurentExpenses';
        axios.get('http://localhost:8000/api/' + route, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }).then(response => {
            this.setState({
                expenses: response.data.data
            }
            )
            console.log(this.state);
        }).catch(error => console.log(error.response));


    }

    /*   handlePageChange = (pageNumber) => {
           console.log(`active page is ${pageNumber}`);
           this.setState({ activePage: pageNumber });
   
           axios.get('http://localhost:8000/api/Expenses?page=' + pageNumber).then(response => {
               this.setState({
                   expenses: response.data.data,
                   itemsCountPerPage: response.data.per_page,
                   totalItemsCount: response.data.total,
                   activePage: response.data.current_page
   
   
   
               })
           }).catch(error => console.log(error.response));
   ()
       }*/


    componentDidMount() {


        const route = this.state.route;
        axios.get('http://localhost:8000/api/' + route, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }).then(response => {
            this.setState({
                expenses: response.data.data
            }
            )
            console.log(this.state);
        }).catch(error => console.log(error.response));


    }

    /* onDelete = (ID) => {
     
         axios.delete(`http://localhost:8000/api/deleteExpense/` + ID).then(response => {
             var newState = this.state.expenses;
             for (var i = 0; i < newState.length; i++) {
                 if (newState[i].id == ID) {
                     newState.splice(i, 1);
                     this.setState({
                         expenses: newState
                     })
                 }
     
             }
             this.setState({
                 alert_message: "Success"
             })
     
         }).catch(error => console.log(error));
     }
    */


    render() {
        console.log(this.state.status)
        console.log(this.state.route)
        const Fixed = <div><div>
            <Navbar />
            <div class="container" >


                <div className="row justify-content-center">
                    <div class="col-md-8">
                        <div className="card">
                            <div className="card-header"> All Fixed Expenses</div>
                            <Link to="/AddExpense" className="btn btn-primary col-md-3 m-2 btn-sm mr-2">Add</Link>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.expenses !== null
                                                ? this.state.expenses.map(expense => (
                                                    <tr key={expense.id} >
                                                        <td>{expense.id}</td>
                                                        <td>{expense.title}</td>
                                                        <td>{expense.description}</td>
                                                        <td>{expense.amount}</td>
                                                        <td>{expense.currency}</td>
                                                        <td>{expense.date}</td>
                                                        <td>
                                                            <Link to={`/${expense.id}/editExpense`} className="btn btn-success col-md-4 m-2 btn-sm mr-2">Edit</Link>
                                                            <Link to='/Expenses' className="btn btn-danger col-md-4 m-2 btn-sm mr-2"> delete</Link>
                                                        </td>
                                                    </tr>

                                                )) :
                                                null

                                        }

                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-center">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        onChange={this.handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div></div>
        const rec = <div> <div><div>
            <Navbar />
            <div class="container" >


                <div className="row justify-content-center">
                    <div class="col-md-8">
                        <div className="card">
                            <div className="card-header"> All Reccurent Expenses</div>
                            <Link to="/AddExpense" className="btn btn-primary col-md-3 m-2 btn-sm mr-2">Add</Link>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            this.state.expenses !== null
                                                ? this.state.expenses.map(expense => (
                                                    <tr key={expense.id} >
                                                        <td>{expense.id}</td>
                                                        <td>{expense.title}</td>
                                                        <td>{expense.description}</td>
                                                        <td>{expense.amount}</td>
                                                        <td>{expense.currency}</td>
                                                        <td>{expense.date}</td>
                                                        <td>
                                                            <Link to={`/${expense.id}/editExpense`} className="btn btn-success col-md-4 m-2 btn-sm mr-2">Edit</Link>
                                                            <Link to='/Expenses' className="btn btn-danger col-md-4 m-2 btn-sm mr-2"> delete</Link>
                                                        </td>
                                                    </tr>

                                                )) :
                                                null

                                        }

                                    </tbody>
                                </table>
                                <div class="d-flex justify-content-center">
                                    <Pagination
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        onChange={this.handlePageChange}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div></div></div>

        return (
            <div>
                <div className="radio-buttons">


                    <input
                        name="st"
                        type="radio"
                        value="fixed"
                        defaultChecked
                        onChange={this.handleChangefixed}
                    />  &nbsp;fixed &nbsp; &nbsp;
                    <input
                        name="st"
                        type="radio"
                        value="reccurent"
                        onChange={this.handleChangeRec}
                    />  &nbsp;reccurent



            </div>
                <div>
                    {this.state.status == "fixed" ? Fixed : rec}

                </div>
            </div>
        );
    }
}
export default Expenses;