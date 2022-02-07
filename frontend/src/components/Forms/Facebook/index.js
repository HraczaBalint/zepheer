import React from 'react';
import FacebookLogin from 'react-facebook-login';
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

            let gender = null;

            if (response.gender === "female") {
                gender = 0;
            }
            else if (response.gender === "male") {
                gender = 1;
            }
            else{
                gender = 2;
            }

            await this.context.facebook(gender, response.first_name, response.birthday, response.email, "");
        }
    }
      
    render() {

        return(
            <>
                <div>
                    <FacebookLogin
                        appId="470923207936372"
                        autoLoad={false}
                        fields="first_name, email, picture, gender, birthday"
                        scope="public_profile, email, user_birthday"
                        callback={this.responseFacebook}
                    />
                </div>
            </>
        )    
    }
}