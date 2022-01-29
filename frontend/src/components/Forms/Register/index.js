import React from "react";
import { ApiContext } from "../../../api/api";

export default class RegisterForm extends React.Component {

    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            name: '',
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

        const { gender, name, email, password } = this.state;

        e.preventDefault();        

        if (gender !== "" && name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
            try {
                await this.context.register(gender, name, email, password);
            } catch (error) {
                this.setState({
                    registerErrorMessage: error.message,
                })
            }
        }
    }
    
    render() {

        const { gender, name, email, password, registerErrorMessage } = this.state;

        return (
            <>
                <form onSubmit={this.handleRegister}>
                    <label>Gender:</label><br />
                    <select name="gender" value={gender} onChange={this.handleChange} required>
                        <option value="" >--Choose--</option>
                        <option value="0">Female</option>
                        <option value="1">Male</option>
                        <option value="2">Other</option>
                    </select><br />
                    <label>First name:</label><br />
                    <input name="name" type="text" value={name} onChange={this.handleChange} required />
                    <label>Email</label><br />
                    <input name="email" type="email" value={email} onChange={this.handleChange} required />
                    <label>Password</label><br />
                    <input name="password" type="password" value={password} onChange={this.handleChange} required />
                    <button type="submit">Register</button>
                </form>
                { registerErrorMessage ? <p>{ registerErrorMessage }</p> : null }
            </>
        );
    }
}