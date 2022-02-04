import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { ApiContext } from '../../../api/api';

export default class LoginForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            handleChange: this.handleChange,
            handleLogin: this.handleLogin,
            loginErrorMessage: null,
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    
    handleLogin = async (e) => {

        const { email, password } = this.state;

        e.preventDefault();

        if (email.trim() !== "" && password.trim() !== "") {
            try {
                await this.context.login(email, password);
            } catch (error) {
                this.setState({
                    loginErrorMessage: error.message,
                })
            }
        }
    }
    
    render() {

        const { email, password, loginErrorMessage } = this.state;

        return (
            <>
                <Form onSubmit={this.handleLogin}>
                    <Form.Group className="mt-5 mb-3">
                        <Alert show={ loginErrorMessage } variant="danger">
                        <Alert.Heading>{ loginErrorMessage ? <p>{ loginErrorMessage }</p> : null }</Alert.Heading>
                        <p>Check the input fields.</p>
                        </Alert>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address:</Form.Label>
                        <Form.Control name="email" value={email} type="email" onChange={this.handleChange} placeholder="name@example.com" maxLength={30} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control name="password" value={password} type="password" onChange={this.handleChange} minLength={6} maxLength={15} required/>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit">Login</Button>
                    </Form.Group>
                </Form>
                
            </>
        );
    }
}