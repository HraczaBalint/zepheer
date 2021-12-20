import React from 'react';
import Buttons from './Buttons';
import Description from './Description';
import Pictures from './Pictures';

export default class Encounters extends React.Component{

    constructor(props) {
        super(props);

        this.state = {

            errorMessage: null,
            loading: true,

            encounterProfiles: [],

            ep_index: 0,
        }
    }

    loadData = async () => {
        this.setState({
            loading: true,
            errorMessage: null,
        });
        try {
            const response = await fetch('http://localhost/zepheer/backend/app/users');
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const encounterProfiles = await response.json();
            this.setState({
                encounterProfiles: encounterProfiles.map(profil => {
                    return {
                        user_id: profil.user_id,
                        user_name: profil.user_name,
                        user_password: profil.user_password,
                        user_email: profil.user_email,
                        user_gender: profil.user_gender,
                        user_gender_preference: profil.user_gender_preference,
                        user_age: profil.user_age,
                        user_age_preference: profil.user_age_preference,
                        user_description: profil.user_description,
                        pictures: [],
                    };
                }),
                loading: false,
                errorMessage: null,
            });
        } catch (error) {
            this.setState({
                errorMessage: error.message
            })
        }
    }

    componentDidMount() {
        this.loadData();
    }

    handleButtonClick = () => {
        this.setState({
            ep_index: this.state.ep_index + 1,
        });
    };

    render() {

        if (this.state.errorMessage) {
            return <div className='error'>
                { this.state.errorMessage }
                <br/>
                <button onClick={this.loadData}>Reload</button>
            </div>
        }

        if (this.state.loading) {
            return <div>Loading...</div>;
        };

        const { encounterProfiles, ep_index } = this.state;

        return(
        <>
            <div className='encounters'>
                <Description
                    user_name={encounterProfiles[ep_index].user_name}
                    user_age={encounterProfiles[ep_index].user_age}
                    user_description={encounterProfiles[ep_index].user_description}
                    user_id={encounterProfiles[ep_index].user_id}
                />
                <Pictures 
                    pictures={encounterProfiles[ep_index].pictures}
                />
                <Buttons
                    user_id={encounterProfiles[ep_index].user_id}
                    on_click={this.handleButtonClick}
                />
            </div>
        </>
        )
    }
}