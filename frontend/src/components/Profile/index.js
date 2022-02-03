import React from 'react';
import { ApiContext } from "../../api/api";

export default class Profile extends React.Component{
    static contextType = ApiContext;

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return(
        <>
            <div>
                
            </div>
        </>
        )
    }
}