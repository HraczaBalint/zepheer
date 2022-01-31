import React from "react";
import { ApiContext } from "../../../api/api";

export default class Logout extends React.Component {

    static contextType = ApiContext;

    render() {
        return(
            <>
                <button type="button" onClick={this.context.logout}>Logout</button>
            </>
        )
    }
}