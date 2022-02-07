import React from 'react';
import './Main.scss';
import Encounters from './Encounters';
import Profile from './Profile';
import { Navigate, Route, Routes } from 'react-router-dom';
import Starter from './Starter';
import LoginRequired from '../api/loginRequired';
import LoginNotRequired from '../api/loginNotRequired';
import NetworkErrorMessage from './Errors/NetworkErrorMessage';
import Navigation from './Navigation';


export default class App extends React.Component{

    render() {

        return(
        <>
            <LoginRequired>
                <Routes>
                    <Route path="/app/encounters" element={<Encounters />} />
                    <Route path="/app/profile" element={<Profile />} />
                    <Route path="*" element={<Navigate replace to="/app/encounters" />} />
                </Routes>
            </LoginRequired>

            <LoginNotRequired>
                <Routes>
                    <Route path="/home" element={<Starter />} />
                    <Route path="/learn-more" element={<Navigation/>} />
                    <Route path="*" element={<Navigate replace to="/home" />} />
                </Routes>
            </LoginNotRequired>
            
            <NetworkErrorMessage />
        </>
        )
    }
}