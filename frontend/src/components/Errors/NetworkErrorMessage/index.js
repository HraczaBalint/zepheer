import React from "react";
import { ApiContext } from "../../../api/api";



export default class NetworkErrorMessage extends React.Component{
    static contextType = ApiContext;

    render() {
        if (this.context.networkError) {
            return <p className="error">Check your internet connection</p>
        }
        else{
            return null;
        }
    }
}