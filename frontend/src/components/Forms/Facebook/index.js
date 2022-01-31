import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Navigate } from 'react-router-dom';
import { ApiContext } from '../../../api/api';

export default class Facebook extends React.Component {

    static contextType = ApiContext;

    constructor(props){
        super(props)
        this.state={
            handleFacebookData: this.handleFacebookData,
        }
    }

    responseFacebook = async (response) => {

        if (response.accessToken) {
            this.handleFacebookData(response);
        }
    }

    handleFacebookData = async (data) => {

        let gender = null;

        if (data.gender === "female") {
            gender = 0;
        }
        else if (data.gender === "male") {
            gender = 1;
        }
        else{
            gender = 2;
        }
        
        await this.context.facebook(gender, data.first_name, data.email, data.userID);
    }
      
    render() {

        return(
            <>
                <div>
                    <FacebookLogin
                        appId="470923207936372"
                        autoLoad={false}
                        fields="first_name, email, picture, gender"
                        scope="public_profile, email"
                        callback={this.responseFacebook}
                    />
                </div>
            </>
        )    
    }
}