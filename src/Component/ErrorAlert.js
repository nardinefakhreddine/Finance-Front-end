import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class ErrorAlert extends Component {
    render() {
        return (
            <div>
                <div class="alert alert-danger" role="alert">
                    Error   Record  Created/Updated !
</div>
            </div>
        )
    }
}
export default ErrorAlert;