import React from 'react';
import { ApiContext } from "../../api/api";
import UserDataForm from '../Forms/UserData';

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
                <UserDataForm />
            </div>
        </>
        )
    }
}