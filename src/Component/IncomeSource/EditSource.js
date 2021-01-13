import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';



class EditSource extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            photo: 'empty',
            ErrorName: '',
            ErrorDesc: ''
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
        axios.get(`http://localhost:8000/api/editIncomesource/${id}`,
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

            }).catch(error => console.error());

    }
    handleFormSubmit = (event) => {

        event.preventDefault();
        const id = this.props.match.params.id;
        axios.put(`http://localhost:8000/api/updateIncomesource/${id}`,
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
                ErrorName: '',
                ErrorDesc: ''
            })
            this.props.history.push('/Source');
        }
        ).catch(error => {
            console.log(error.response.data.message)
            this.setState({
                alert_message: error.response.data.message,


            })

        })

    }





    render() {
        return (
            <div className="container" >

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Edit Income Source</div>
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
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
                                    <div className="form-group">

                                        <input type="text"
                                            required
                                            onChange={this.handleInputDChange}
                                            value={this.state.description}
                                            className="form-control"
                                            placeholder="Description" />
                                    </div>
                                    <i style={{ color: 'red', fontSize: '10px' }}>{this.state.alert_message}</i>
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
export default EditSource;