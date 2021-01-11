import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AddAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            photo: 'empty'
        }
    }
    handleInputNameChange = (event) => {
        this.setState({
            name: event.target.value,

        })
    }
    handleInputDChange = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleInputChange = (event) => {
        this.setState({
            name: event.target.value,
            description: event.target.value
        })
    }


    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/Addcategory',
            {
                name: this.state.name,
                description: this.state.description,
                photo: this.state.photo
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
                tel: '',
                photo: ''
            })
            this.props.history.push('/categories');
        }
        ).catch(error => console.log(error));
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
                                        placeholder="Enter name" />
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