import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class AddCategory extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            photo: 'empty',
            errorName: '',
            errorDescription: '',
            alert_message1: '',
            alert_message2: ''
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
        ).catch(error => {

            console.log(error.response.data.message)
            console.log(error.response.data)
            if (error.response.data.errors.name !== "undefined" && error.response.data.errors.description !== "undefined") {
                this.setState({
                    alert_message1: error.response.data.errors.description,
                    alert_message2: error.response.data.errors.name,
                })
            }
            else if (error.response.data.errors.description !== "undefined") {
                this.setState({
                    alert_message1: error.response.data.errors.description,

                })


            } else if (error.response.data.errors.name !== "undefined") {
                this.setState({
                    alert_message2: error.response.data.errors.name,
                })
            }


        }

        );
    }

    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Category</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"

                                        onChange={this.handleInputNameChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="Enter name" />
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message2}</i>
                                </div>
                                <div className="form-group">

                                    <input type="text"

                                        onChange={this.handleInputDChange}
                                        value={this.state.description}
                                        className="form-control"
                                        placeholder="Description" />
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message1}</i>
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
export default AddCategory;