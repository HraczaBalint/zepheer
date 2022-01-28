import React from "react";
import { ApiContext } from '../../../api/api';

export default class LoginForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
            loginErrorMessage: null,
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    
    handleLogin = async () => {

        const { email, password } = this.state;

        if (email.trim() !== "" && password.trim() !== "") {
            try {
                await this.context.login(email, password);
                this.setState({
                    email: '',
                    password: '',
                    loginErrorMessage: null,
                })
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
                <label>Email</label><br />
                <input name="email" type="email" value={email} onChange={this.handleChange} required />
                <label>Password</label><br />
                <input name="password" type="password" value={password} onChange={this.handleChange} required />
                <button type="button" onClick={this.handleLogin}>Submit</button>
                { loginErrorMessage ? <p>{ loginErrorMessage }</p> : null }
            </>
        );
    }
}