import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import ErrorAlert from './ErrorAlert'
import SuccessAlert from './SuccessAlert';

class Editcategory extends Component {


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
            name: event.target.value
        })
    }
    handleInputDChange = (event) => {
        this.setState({
            description: event.target.value
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
        axios.get(`http://localhost:8000/api/editcategory/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.adminsToken}`
                }
            }).then(response => {
                this.setState({
                    name: response.data.name,
                    description: response.data.description,
                })
                console.log(this.state);
            }).catch(error => console.error());

    }
    handleFormSubmit = (event) => {

        event.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`http://localhost:8000/api/updatecategory/${id}`,
            {
                name: this.state.name,
                description: this.state.description,

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
                alert_message: ''
            })
            this.props.history.push('/categories');
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
                            <div className="card-header">Edit Category</div>
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
                                            onChange={this.handleInputDChange}
                                            value={this.state.description}
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
export default Editcategory;