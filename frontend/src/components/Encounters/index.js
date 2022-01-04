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
            const user_data = await fetch('http://localhost/zepheer/backend/app/users');
            //const user_pictures = await fetch('http://localhost/zepheer/backend/app/pictures');

            if (!user_data.ok) {
                throw Error(user_data.statusText);
            }
            const encounterProfiles = await user_data.json();
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
                        pictures: ['asd.jpg', 'fgh.jpg', 'jkl.jpg'],
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

    handleButtonClick = async (rating) => {

        const { encounterProfiles, ep_index } = this.state;

        try {

            const newRating = {
                user_id: 1,
                user_id_rated: encounterProfiles[ep_index].user_id,
                rating: rating,
            }

            const response = await fetch('http://localhost/zepheer/backend/app/encounters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRating)
            });

            if (response.ok) {
                if (ep_index < encounterProfiles.length - 1) {
            
                    this.setState({
                        ep_index: this.state.ep_index + 1,
                    });
                }
                else{
                    this.setState({
                        errorMessage: "That was everyone!"
                    })
                }
            }
        } catch (error) {
            this.setState({
                errorMessage: error.message
            })
        }
    };

    render() {

        const { encounterProfiles, ep_index, loading, errorMessage } = this.state;

        if (errorMessage) {
            return <div className='error'>
                { this.state.errorMessage }
                <br/>
                <button onClick={this.loadData}>Reload</button>
            </div>
        }

        if (loading) {
            return <div>Loading...</div>;
        };



        return(
        <>
            <div className='encounters'>
                <Description
                    user_name={encounterProfiles[ep_index].user_name}
                    user_age={encounterProfiles[ep_index].user_age}
                    user_description={encounterProfiles[ep_index].user_description}
                />
                <Pictures 
                    pictures={encounterProfiles[ep_index].pictures}
                />
                <Buttons
                    on_click={this.handleButtonClick}
                />
            </div>
        </>
        )
    }
}