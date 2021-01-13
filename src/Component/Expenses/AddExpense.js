import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AddAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,

        })
        console.log(this.setState);
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/CreateAdmin',
            {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
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
                name: '',
                email: '',
                password: ''
            })
            this.props.history.push('/Admins');
        }
        ).catch(error => {
            console.log(error.response.data);
            console.log(this.State);

        });
    }
    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add New Admin</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="name"
                                        onChange={this.handleInputChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="User name" />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        name="email"
                                        onChange={this.handleInputChange}
                                        value={this.state.email}
                                        className="form-control"
                                        placeholder="Email" />
                                </div>
                                <div className="form-group">

                                    <input type="password"
                                        required
                                        name="password"
                                        onChange={this.handleInputChange}
                                        value={this.state.password}
                                        className="form-control"
                                        placeholder="Password" />
                                </div>

                                <div className="form-group form-check">

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
export default AddAdmin;