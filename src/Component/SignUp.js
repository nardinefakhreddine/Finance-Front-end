import React, { Component } from "react";
import { login } from './function';

import { Redirect } from 'react-router-dom'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import Switch from "react-bootstrap/esm/Switch";

class SignUp extends Component {
    state = {
        //inputs
        email: '',
        password: '',

        //validation
        error: ''
    };
    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })

    }
    render() {
        const signup = <div>
            <div style={{ padding: '50px' }}></div>
            <div
                className="card text-white bg-dark mb-3 card_login container col-6 align-self-center"
                style={{ maxWidth: "18rem" }}
            >
                <div className="card-header">Sign Up</div>
                <div className="card-body">
                    <form onSubmit={this.submitState}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                                Email address
                </label>
                            <input
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                name='email'
                                value={this.state.email}
                                onChange={this.changeState}
                            />

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                                Password
                </label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                name='password'
                                value={this.state.password}
                                onChange={this.changeState}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Submit
            </button>
                    </form>
                </div>
            </div>
        </div>

        return (
            <div>
                {localStorage.adminsToken ? signup : <Redirect to='/' ></Redirect>}
            </div>

        );

    }
}
export default SignUp;