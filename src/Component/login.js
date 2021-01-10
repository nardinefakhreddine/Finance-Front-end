import React, { Component } from "react";
import { login } from './function';
import { Redirect } from 'react-router-dom'
//import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

class Login extends Component {
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

    submitState = (e) => {
        e.preventDefault();

        const adminsData = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(adminsData);
        login(adminsData).then(res => {
            if (res) {
                console.log(this.props.history);
                this.props.history.push('/dashboard');
                console.log('succeslogin');
                console.log(this.state);
                console.log(res);
                console.log(localStorage.adminsToken);
                // <Redirect to='/home' />


            } else {
                this.setState({
                    error: 'email or password is wrong'
                })
                console.log(this.props);
                console.log(this.state);
            }
        })
    }
    render() {
        const error = <div className='alert alert-danger' > {this.state.error} </div>
        return (
            <div>
                {this.state.error ? error : null}
                <div style={{ padding: '50px' }}></div>
                <div
                    className="card text-white bg-dark mb-3 card_login container col-6 align-self-center"
                    style={{ maxWidth: "18rem" }}
                >
                    <div className="card-header">Admin Login</div>
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

        );
    }
}

export default Login;
























/*import React, { Component } from 'react';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';



class Login extends Component {

    state = {
        email: '',
        password: ''
    };
    changeState = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: this.state.email,
            password: this.state.password
        })
            .then((response) => {
                const token = response.data.token;
                console.log(token);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (<div className="form-group">

            <div className="login" >Email<br />
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeState} />
                    <br />password<br />

                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.changeState} />

                    <br></br>
                    <input type='submit' className='btn' value='Login' />
                </form>
            </div>
        </div >


        );
    }

}
export default Login;*/