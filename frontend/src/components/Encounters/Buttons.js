import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';


export default class Buttons extends React.Component{

    render() {

        const { user_id } = this.props;

        return(
        <>
            <div className='buttons'>
                <Button text="Dislike" />
                <Button text="Like" />
            </div>
        </>
        )
    }
}

Buttons.propTypes = {
    user_id: PropTypes.number.isRequired,
}