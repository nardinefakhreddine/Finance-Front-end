import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ErrorAlert from './ErrorAlert'
import SuccessAlert from './SuccessAlert';

class Edit extends Component {


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
                tel: '',
                alert_message: ''
            })
            this.props.history.push('/');
        }
        ).catch(error => console.log(error));
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`http://localhost:8000/api/contact/${id}/edit`).then(response => {
            this.setState({
                name: response.data.name,
                tel: response.data.tel
            })
        }).catch(error => console.error());

    }
    handleFormSubmit = (event) => {

        event.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`http://localhost:8000/api/contact/${id}/update`,
            {
                name: this.state.name,
                tel: this.state.tel
            }
        ).then(response => {
            this.setState({
                name: '',
                tel: '',
                alert_message: ''
            })
            this.props.history.push('/');
        }
        ).catch(error => {
            this.setState({ alert_message: "Error" })
            console.log(error);

        })

    }





    render() {
        return (
            <div className="container" >
                {this.state.alert_message == "Error" ? <ErrorAlert /> : null}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Admin</div>
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
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Edit;