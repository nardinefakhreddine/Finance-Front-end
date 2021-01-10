import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class Add extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tel: ''
        }
    }
    handleInputNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    handleInputTelChange = (event) => {
        this.setState({
            tel: event.target.value
        })
    }
    handleFormSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/contact/create',
            {
                name: this.state.name,
                tel: this.state.tel
            }
        ).then(response => {
            this.setState({
                name: '',
                tel: ''
            })
            this.props.history.push('/');
        }
        ).catch(error => console.log(error));
    }

    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Admin</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        onChange={this.handleInputNameChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="Enter name" />
                                </div>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        onChange={this.handleInputTelChange}
                                        value={this.state.tel}
                                        className="form-control"
                                        placeholder="Enter phone" />
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
export default Add;