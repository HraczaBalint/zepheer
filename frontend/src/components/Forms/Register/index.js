import React from "react";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gender: '',
            first_name: '',
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

        const { gender, first_name, email, password } = this.state;

        const newUser = {
            gender: gender,
            first_name: first_name,
            email: email,
            password: password,
        }
        JSON.stringify(newUser);

        console.log(newUser);
        e.preventDefault();
    }
    
    render() {

        const { gender, first_name, email, password } = this.state;

        return (
          <form onSubmit={this.handleSubmit}>
            <label>Gender:</label><br />
            <select name="gender" value={gender} onChange={this.handleChange} required>
                <option value="" >--Choose--</option>
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Other</option>
            </select><br />
            <label>First name:</label><br />
            <input name="first_name" type="text" value={first_name} onChange={this.handleChange} required />
            <label>Email</label><br />
            <input name="email" type="email" value={email} onChange={this.handleChange} required />
            <label>Password</label><br />
            <input name="password" type="password" value={password} onChange={this.handleChange} required />
            <button type="submit">Submit</button>
          </form>
        );
    }
}