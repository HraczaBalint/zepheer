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
                <form onSubmit={this.handleLogin}>
                    <label>Email:</label><br />
                    <input name="email" type="email" value={email} onChange={this.handleChange} required /><br />
                    <label>Password:</label><br />
                    <input name="password" type="password" value={password} onChange={this.handleChange} required /><br />
                    <button type="submit">Login</button>
                </form>
                { loginErrorMessage ? <p>{ loginErrorMessage }</p> : null }
            </>
        );
    }
}