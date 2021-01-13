import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ErrorAlert from './ErrorAlert'
import SuccessAlert from './SuccessAlert';

class EditAdmin extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: 'empty',
            ErrorName: '',
            ErrorDesc: ''
        }
    }
    handleInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /*  handleFormSubmit = (event) => {
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
                  description: '',
                  photo: 'empty',
                  alert_message: ''
              })
              this.props.history.push('/categories');
          }
          ).catch(error => console.log(error));
      }*/
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        axios.get(`http://localhost:8000/api/editAdmin/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }).then(response => {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    password: response.data.password
                })
                console.log(this.state);
            }).catch(error => console.error());

    }
    handleFormSubmit = (event) => {

        event.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`http://localhost:8000/api/updateAdmin/${id}`,
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
                description: '',
                ErrorName: '',
                ErrorDesc: ''
            })
            this.props.history.push('/Admins');
        }
        ).catch(error => {

            console.log(error.response.data)


            this.setState({
                alert_message: error.response.data.message,
            })

        })

    }





    render() {
        return (
            <div className="container" >
                {this.state.ErrorName ? <ErrorAlert message={this.state.ErrorName} /> : null}
                {this.state.ErrorDesc ? <ErrorAlert message={this.state.ErrorDesc} /> : null}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Admin </div>
                            <div className="card-body">

                                <form onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">

                                        <input type="text"
                                            name="name"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.name}
                                            className="form-control"
                                            placeholder="Enter name" />
                                    </div>
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
                                    <div className="form-group">

                                        <input type="text"
                                            name="email"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.email}
                                            className="form-control"
                                            placeholder="Enter Email" />
                                        <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
                                    </div>
                                    <div className="form-group">

                                        <input type="password"
                                            name="password"
                                            required
                                            onChange={this.handleInputChange}
                                            value={this.state.password}
                                            className="form-control"
                                            placeholder="Enter phone" />
                                        <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
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
export default EditAdmin;