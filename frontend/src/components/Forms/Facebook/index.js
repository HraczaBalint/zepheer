import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { ApiContext } from '../../../api/api';

export default class Facebook extends React.Component {

    static contextType = ApiContext;

    constructor(props){
        super(props)
        this.state={
            status: 10,
            handleFacebookData: this.handleFacebookData,
        }
    }

    responseFacebook = async (response) => {

        const { status } = this.state;

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

            const birthday_splitted = response.birthday.split('/');

            const birthday = `${birthday_splitted[2]}-${birthday_splitted[0]}-${birthday_splitted[1]}`;

            await this.context.facebook(gender, response.first_name, birthday, response.email, status);
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