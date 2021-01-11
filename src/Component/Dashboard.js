import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Navbar from './NavBar';


class Dashboard extends Component {

    logout = async (e) => {

        e.preventDefault();
        const url = "http://localhost:8000/api/logout";
        const Token = window.localStorage.adminsToken;
        const body = {

        }
        const respond = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + Token,

            },
            body: JSON.stringify(body)
        });
        console.log(respond);
        const res = await respond.json();
        console.log(res);
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