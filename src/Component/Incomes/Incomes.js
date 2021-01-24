import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { CgTrash } from "react-icons/cg";
import { BsBoxArrowDown } from "react-icons/bs";
import Navbar from '../NavBar';
import { Confirm } from 'react-st-modal';
class Incomes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: '',
            status: 1,
            route: 'income'
        }
    }

    handleChangefixed = (event) => {
        this.setState({
            status: 1,

        })
    }
    /*
    const route = 'income';
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
 
    }).catch(error => console.log(error.response));
 
}*/
    handleChangeRec = (event) => {
        this.setState({
            status: 0,

        })

        const route = 'incomeRec';
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

        }).catch(error => console.log(error.response));


    }


    /*   handlePageChange = (pageNumber) => {
           console.log(`active page is ${pageNumber}`);
           this.setState({ activePage: pageNumber });
     
           axios.get('http://localhost:8000/api/expense?page=' + pageNumber).then(response => {
               this.setState({
                   expenses: response.data.data,
                   itemsCountPerPage: response.data.per_page,
                   totalItemsCount: response.data.total,
                   activePage: response.data.current_page
     
     
     
               })
           }).catch(error => console.log(error.response));
     
       }
    */

    componentDidMount() {

        axios.get('http://localhost:8000/api/income', {
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
            console.log(response.data.data);
        }).catch(error => console.log(error));


    }

    onDelete = (ID) => {

        axios.delete(`http://localhost:8000/api/deleteIncome/` + ID).then(response => {
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



    render() {


        const Fixed = <div><div>
            <Navbar />
            <div className="col-md-20">


                <div className="row justify-content-center">
                    <div class="col-md-8">
                        <div className="card">
                            <div className="card-header"> All Fixed Incomes</div>
                            <Link to="/AddIncome" className="btn btn-primary col-md-3 m-2 btn-sm mr-2">Add</Link>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Currency</th>
                                            <th>Category-Name</th>
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
                                                        <td>{expense.source.name}</td>
                                                        <td>{expense.date}</td>
                                                        <td>
                                                            <Link to={`/${expense.id}/editExpense`} className=" col-md-4 m-2 btn-sm mr-2"><BsBoxArrowDown /></Link>
                                                            <Link to='/Incomes' className="col-md-4 m-2 btn-sm mr-2" onClick={async () => {
                                                                const isConfirm = await Confirm('Are you sure you want to delete? ', 'You cannot undo this action');
                                                                if (isConfirm) { this.onDelete(expense.id) }
                                                            }

                                                            } ><CgTrash /></Link>
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
            <div >
                <div className="row justify-content-center">
                    <div class="col-md-8">
                        <div className="card">
                            <div className="card-header"> All Reccurent Incomes</div>
                            <Link to="/AddReccurentIncome" className="btn btn-primary col-md-3 m-2 btn-sm mr-2">Add</Link>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Category-Name</th>
                                            <th>Reccurence</th>
                                            <th>Start-Date</th>
                                            <th>End-Date</th>
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
                                                        <td>{expense.source.name}</td>
                                                        <td>{expense.reccurence}</td>
                                                        <td>{expense.startdate}</td>
                                                        <td>{expense.enddate}</td>
                                                        <td>
                                                            <Link to={`/${expense.id}/editExpense/`} className=" col-md-2 m-2 btn-sm mr-2"><BsBoxArrowDown /></Link>
                                                            <Link to='/Incomes' className=" col-md-2 m-2 btn-sm mr-2" onClick={async () => {
                                                                const isConfirm = await Confirm('Are you sure you want to delete? ', 'You cannot undo this action');
                                                                if (isConfirm) { this.onDelete(expense.id) }
                                                            }

                                                            }> <CgTrash /></Link>
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
                        checked={this.state.status == 1 ? "defaultChecked " : null}
                        onChange={this.handleChangefixed}
                    />  &nbsp;fixed &nbsp; &nbsp;
                    <input
                        name="st"
                        type="radio"
                        value="reccurent"
                        checked={this.state.status == 0 ? "defaultChecked" : null}
                        onChange={this.handleChangeRec}
                    />  &nbsp;reccurent



            </div>
                <div>
                    {this.state.status == 1 ? Fixed : rec}

                </div>
            </div>
        );
    }
}
export default Incomes;