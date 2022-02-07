import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { ApiContext } from "../../../api/api";

export default class RegisterForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            name: '',
            birthday: '',
            email: '',
            password: '',
            handleChange: this.handleChange,
            handleRegister: this.handleRegister,
            registerErrorMessage: null,
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    
    handleRegister = async (e) => {

        const { gender, name, birthday, email, password } = this.state;

        e.preventDefault();        

        if (gender !== "" && name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
            try {
                await this.context.register(gender, name, birthday, email, password);
            } catch (error) {
                this.setState({
                    registerErrorMessage: error.message,
                })
            }
        }
    }
    
    render() {

        const { gender, name, birthday, email, password, registerErrorMessage } = this.state;

        return (
            <>
                <Form onSubmit={this.handleRegister}>
                    <Form.Group className="mt-5 mb-3">
                        <Alert show={ registerErrorMessage } variant="danger">
                        <Alert.Heading>{ registerErrorMessage ? <p>{ registerErrorMessage }</p> : null }</Alert.Heading>
                        <p>Check the input fields.</p>
                        </Alert>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender:</Form.Label>
                        <Form.Select name="gender" value={gender} onChange={this.handleChange} required>
                            <option value="" >--Choose--</option>
                            <option value="0">Female</option>
                            <option value="1">Male</option>
                            <option value="2">Other</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First name:</Form.Label>
                        <Form.Control name="name" value={name} type="text" onChange={this.handleChange}  maxLength={15} required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Birth date:</Form.Label>
                        <Form.Control name="birthday" value={birthday} type="date" onChange={this.handleChange} required/>
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
                        <Button type="submit">Register</Button>
                    </Form.Group>
                </Form>
            </>
        );
    }
}