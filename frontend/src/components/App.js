import React from 'react';
import './Main.scss';
import Encounters from './Encounters';
import Profile from './Profile';
import { Navigate, Route, Routes } from 'react-router-dom';


export default class App extends React.Component{

    render() {

        return(
        <>
            <Routes>
                <Route path="/get-started" element={"register + login"} />
                <Route path="/app/encounters" element={<Encounters />} />
                <Route path="/app/profile" element={<Profile />} />
                <Route path="*" element={<Navigate replace to="/get-started" />} />
            </Routes>
        </>
        )
    }
}