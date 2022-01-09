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
            rating: null,

            encounterProfiles: [],

            ep_index: 0,
        }
    }

    loadData = async () => {
        this.setState({
            loading: true,
            errorMessage: null,
            ep_index: 0,
        });
        try {
            const user_data = await fetch('http://localhost/zepheer/backend/app/users');

            if (!user_data.ok) {
                throw Error(user_data.statusText);
            }
            const encounterProfiles = await user_data.json();

            console.log(encounterProfiles);
            this.setState({
                encounterProfiles: encounterProfiles.map(profil => {
                    return {
                        user_id: profil.user_id,
                        user_name: profil.user_name,
                        user_age: profil.user_age,
                        user_description: profil.user_description,
                        pictures: [profil.picture_name],
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
            return( 
            <>
                <div className='encounters'>
                    <div className='error'>
                        <p><h3>{ this.state.errorMessage }</h3></p>
                        <button onClick={this.loadData}>Reload</button>
                    </div>
                </div>
            </>
            )
        }

        if (loading) {
            return( 
                <>
                    <div className='encounters'>
                        <div className='loading'>
                            <h3>Loading...</h3>
                        </div>
                    </div>
                </>
                )
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