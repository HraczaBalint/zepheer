import React from "react";
import { ApiContext } from "../../../api/api";
import { Alert } from "react-bootstrap";


export default class NetworkErrorMessage extends React.Component{
    static contextType = ApiContext;

    render() {
        if (this.context.networkError) {
            return(
                <>
                    <Alert show={this.context.networkError} variant="danger">
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