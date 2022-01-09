import React from 'react';
import PropTypes from 'prop-types';

export default class Picture extends React.Component{

    render() {

        const { src } = this.props;

        return(
        <>
            <div className='picture'>
                <img src={src} alt={src} />
            </div>
        </>
        )
    }
}

Picture.protoTypes = {
    src: PropTypes.string.isRequired,
}