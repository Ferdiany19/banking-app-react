import React from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import _ from 'lodash';
import { initiateLogin } from '../actions/auth';
import { validateFields } from '../utils/common';
import { Link } from 'react-router-dom';
import { resetErrors } from '../actions/errors';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errorMsg: ''
    };

    componentDidUpdate(prevProps) {
        if(!_.isEqual(prevProps.errors, this.props.errors)) {
            this.setState({ errorMsg: this.props.errors });
        }
    }

    componentWillUnmount() {
        this.props.dispatch(resetErrors());
    }

    handleLogin = (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const fieldsToValidate = [{ email }, { password }];

        const allFieldsEntered = validateFields(fieldsToValidate);
        if (!allFieldsEntered) {
            this.setState({
                errorMsg: {
                    signin_error: 'Please enter all the following fields'
                }
            });
        } else {
            this.setState({
                errorMsg: {
                    signin_error: ''
                }
            });
            // login berhasil
            this.props.dispatch(initiateLogin(email, password));
        }
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    };


    render() {
        const { errorMsg } = this.state;
        return (
            <div className="login-page">
                <h1>Banking App</h1>
                <div className="login-form">
                    <Form onSubmit={this.handleLogin}>
                        {errorMsg && errorMsg.signin_error && (
                        <p className="errorMsg centered-message">
                            {errorMsg.signin_error}
                        </p>
                        )}
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                onChange={this.handleInputChange}
                            />
                            </Form.Group>
                            <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={this.handleInputChange}
                            />
                            </Form.Group>
                            <div className="action-items">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <Link to="/register" className="btn btn-secondary">
                                Create account
                            </Link>
                            </div>
                    </Form>
                </div>
            </div>
        );
    }
}

const mapStateToPros = (state) => ({
    errors: state.errors
})

export default connect(mapStateToPros) (Login);