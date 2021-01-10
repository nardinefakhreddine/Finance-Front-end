import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class SuccessAlert extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div >
                    {alert(this.props.message)}
                </div>
            </div>
        )
    }
}
export default SuccessAlert;