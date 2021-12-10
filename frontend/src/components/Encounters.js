import React from 'react';
import Buttons from './Buttons';
import Frame from './Frame';



export default class Encounters extends React.Component{

    render() {

        return(
        <>
            <div className='encounters'>
                <Frame />
                <Buttons />
            </div>
            
        </>
        )
    }
}