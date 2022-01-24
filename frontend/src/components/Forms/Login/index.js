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
            errorMessage: null,
        };
    }
    
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({[name]: value});
    }
    
    handleLogin = () => {

        const { email, password } = this.state;

        this.setState({
            errorMessage: null,
        })

        try {
            this.context.login(email, password);

        } catch (error) {
            this.setState({
                errorMessage: "Incorrect email or password",
            })
        }
    }
    
    render() {

        const { email, password, errorMessage } = this.state;

        if (errorMessage) {
            return( 
            <>
                <div className='error'>
                    <p><h3>{ this.state.errorMessage }</h3></p>
                </div>
            </>
            )
        }

        return (
            <>
                <label>Email</label><br />
                <input name="email" type="email" value={email} onChange={this.handleChange} required />
                <label>Password</label><br />
                <input name="password" type="password" value={password} onChange={this.handleChange} required />
                <button type="button" onClick={this.handleLogin}>Submit</button>
            </>
        );
    }
}