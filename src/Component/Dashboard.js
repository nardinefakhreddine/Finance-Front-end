import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Navbar from './NavBar';


class Dashboard extends Component {

    logout = (e) => {
        axios.post('http://localhost:8000/api/logout')
            .then(res => console.log(res))
            .catch(error => console.log(error));

        e.preventDefault();
        localStorage.removeItem("adminsToken");

        this.props.history.push(`/`);
        console.log(localStorage.adminsToken);

    }
    render() {
        const home = <div>
            <Navbar />
            <Link to="/" onClick={this.logout.bind(this)} >Logout</Link>

            <Link to="/SignUp" >Sign Up</Link>

        </div>

        return (
            <div>
                {localStorage.adminsToken ? home : <Redirect to='/' ></Redirect>}
            </div>
        );
    }
}
export default Dashboard;