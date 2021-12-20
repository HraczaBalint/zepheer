import React from 'react';

export default class Profile extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            userProfile: {
                user_id: 1,
                user_name: "Jani",
                user_password: "jelszo",
                user_email: "jani@gmail.com",
                user_gender: 1,
                user_gender_preference: 0,
                user_age: 20,
                user_age_preference: "19.756",
                user_description: "Hello there",
            }
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