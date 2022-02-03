import React from "react";
import { ApiContext } from "../../../api/api";
import { Alert } from "react-bootstrap";


export default class NetworkErrorMessage extends React.Component{
    static contextType = ApiContext;

    constructor (props) {
        super(props);
        this.state = {
            networkError: true,
            handleShowError: this.handleShowError,
        };
    }

    handleShowError = () => {
        this.setState({
            networkError: !this.state.networkError,
        })
    }

    render() {
        if (this.context.networkError) {
            return(
                <>
                    <Alert show={this.state.networkError} variant="danger" onClose={this.handleShowError} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>Pleasse check your internet connection and try again.</p>
                    </Alert>
                </>
            )
        }
        else{
            return null;
        }
    }
}