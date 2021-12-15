import React from 'react';
import './Main.scss';
import Encounters from './Encounters';
import Profile from './Profile';


export default class App extends React.Component{

    render() {

        return(
        <>
            <div className='app'>
                <Encounters />
                <Profile />
            </div>
        </>
        )
    }
}