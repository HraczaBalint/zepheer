import React from "react";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            handleChange: this.handleChange,
            handleSubmit: this.handleSubmit,
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    
    handleSubmit = (e) => {

        const { email, password } = this.state;

        const newUser = {
            email: email,
            password: password,
        }
        JSON.stringify(newUser);

        console.log(newUser);
        e.preventDefault();
    }
    
    render() {

        const { email, password } = this.state;

        return (
          <form onSubmit={this.handleSubmit}>
            <label>Email</label><br />
            <input name="email" type="email" value={email} onChange={this.handleChange} required />
            <label>Password</label><br />
            <input name="password" type="password" value={password} onChange={this.handleChange} required />
            <button type="submit">Submit</button>
          </form>
        );
    }
}