import React, { Component } from 'react';
import './NavBar.css';
import { Link, NavLink } from 'react-router-dom'


class Navbar extends Component {
    render() {
        return (



            <div className="wrapper">
                <div className="sidebar">
                    <h2>FNAPP</h2>
                    <ul>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                        <li><NavLink to="/Admins">Admins</NavLink></li>
                        <li><NavLink to="/categories">Categories</NavLink></li>
                        <li><NavLink to="/Source">IncomeSources</NavLink></li>
                        <li><NavLink to="/Expenses">Expenses</NavLink></li>
                        <li><NavLink to="/Incomes">Incomes</NavLink></li>
                        <li><NavLink to="/About uS">About Us</NavLink></li>

                    </ul>

                </div>
                <div className="main_content">
                    <div className="header"></div>

                </div>
            </div>


        )

    }
}
export default Navbar;