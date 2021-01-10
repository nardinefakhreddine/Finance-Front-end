import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import SuccessAlert from './SuccessAlert';
import Navbar from './NavBar';
class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 3,
            alert_message: ''
        }
    }
    handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });

        axios.get('http://localhost:8000/api/categories?page=' + pageNumber, {
            headers: {
                Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }).then(response => {
            this.setState({
                categories: response.data.data,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page



            })
        }).catch(error => console.error());


    }
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



    onDelete = (ID) => {

        axios.delete(`http://localhost:8000/api/deletecategory/` + ID, {
            headers: {
                Authorization: `Bearer ${localStorage.adminsToken}`
            }
        }
        ).then(response => {
            var newState = this.state.categories;
            for (var i = 0; i < newState.length; i++) {
                if (newState[i].id == ID) {
                    newState.splice(i, 1);
                    this.setState({
                        categories: newState
                    })
                }

            }
            this.setState({
                alert_message: "Success"
            })

        }).catch(error => console.log(error));
    }



    render() {
        return (<div>
            <Navbar />
            <div class="container" >


                <div className="row justify-content-center">

                    <div class="col-md-8">
                        <div className="card">
                            <div className="card-header">All Categories</div>
                            <Link to="/add" className="btn btn-primary col-md-3 m-2 btn-sm mr-2">Add</Link>
                            <div class="card-body">
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>



                                        {
                                            this.state.categories !== null
                                                ? this.state.categories.map(category => (
                                                    <tr key={category.id} >
                                                        <td>{category.id}</td>
                                                        <td>{category.name}</td>
                                                        <td>{category.description}</td>
                                                        <td>
                                                            <Link to={`/${category.id}/edit`} className="btn btn-success col-md-4 m-2 btn-sm mr-2">Edit</Link>
                                                            <Link to='/categories' className="btn btn-danger col-md-4 m-2 btn-sm mr-2" onClick={this.onDelete.bind(this, category.id)}> delete</Link>
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

                                {this.state.alert_message == "Success" ? <SuccessAlert message="Record Deleted Successfully" /> : null}
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </div>
        );
    }
}
export default Category;

