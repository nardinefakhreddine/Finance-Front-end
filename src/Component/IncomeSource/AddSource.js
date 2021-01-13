import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';


class AddSource extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            photo: 'empty',
            errorName: '',
            errorDescription: ''
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
        axios.post('http://localhost:8000/api/AddSource',
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
            this.props.history.push('/Source');
        }
        ).catch(error => {

            console.log(error.response.data.message)
            this.setState({
                alert_message: error.response.data.message,


            })

        }

        );
    }

    render() {
        return (<div className="container" >
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Add Income Source</div>
                        <div className="card-body">

                            <form onSubmit={this.handleFormSubmit}>
                                <div className="form-group">

                                    <input type="text"
                                        required
                                        onChange={this.handleInputNameChange}
                                        value={this.state.name}
                                        className="form-control"
                                        placeholder="Enter name" />
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
                                </div>
                                <div className="form-group">

                                    <input type="text"

                                        onChange={this.handleInputDChange}
                                        value={this.state.description}
                                        className="form-control"
                                        placeholder="Description" />
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
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
export default AddSource;