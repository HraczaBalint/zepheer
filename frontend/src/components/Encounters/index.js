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
                    user_id: "2",
                    user_name: "Ági",
                    user_password: "jelszo",
                    user_email: "agi@gmail.com",
                    user_gender: "0",
                    user_gender_preference: "1",
                    user_age: "22",
                    user_age_preference: "22.156",
                    user_description: "Hi",
                    pictures: ['asd.jpg', 'fgh.jpg'],
                },
                {
                    user_id: "3",
                    user_name: "Évi",
                    user_password: "jelszo",
                    user_email: "evi@gmail.com",
                    user_gender: "0",
                    user_gender_preference: "1",
                    user_age: "25",
                    user_age_preference: "30.555",
                    user_description: "Hello there",
                    pictures: ['dsa.jpg', 'hgf.jpg'],
                },
            ]
        }
    }

    componentDidMount() {
        // Adatok lekérdezése
    }

    render() {

        return(
        <>
            <div className='encounters'>
                
                {
                    this.state.encounterProfiles.map((profil, index)=>
                        [
                        <Description
                            user_name={profil.user_name}
                            user_age={profil.user_age}
                            user_description={profil.user_description}
                            user_id={profil.user_id}
                        />,
                        <Pictures pictures={profil.pictures} />,
                        <Buttons user_id={profil.user_id} />,
                        ]
                    )
                };
                
            </div>
        </>
        )
    }
}