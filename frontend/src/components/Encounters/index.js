import React from 'react';
import Buttons from './Buttons';
import Description from './Description';
import Pictures from './Pictures';

export default class Encounters extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            encounterProfiles: [
                {
                    user_id: 2,
                    user_name: "Ági",
                    user_password: "jelszo",
                    user_email: "agi@gmail.com",
                    user_gender: 0,
                    user_gender_preference: 1,
                    user_age: 22,
                    user_age_preference: "22.156",
                    user_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    pictures: ['asd.jpg', 'fgh.jpg', 'jkl.jpg'],
                },
                {
                    user_id: 3,
                    user_name: "Évi",
                    user_password: "jelszo",
                    user_email: "evi@gmail.com",
                    user_gender: 0,
                    user_gender_preference: 1,
                    user_age: 25,
                    user_age_preference: "30.555",
                    user_description: "Nam libero justo laoreet sit amet cursus. Mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus. Metus vulputate eu scelerisque felis imperdiet proin fermentum. Id eu nisl nunc mi ipsum faucibus vitae aliquet. Ut aliquam purus sit amet.",
                    pictures: ['dsa.jpg', 'hgf.jpg'],
                },
            ],

            ep_index: 0,
        }
    }

    componentDidMount() {
        // Adatok lekérdezése
    }

    handleButtonClick = () => {
        this.setState({
            ep_index: this.state.ep_index + 1,
        });
    };

    render() {

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