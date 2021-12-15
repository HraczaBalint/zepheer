import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';


export default class Buttons extends React.Component{

    render() {

        const { user_id, on_click } = this.props;

        return(
        <>
            <div className='buttons'>
                <Button on_click={on_click} text="Dislike" />
                <Button on_click={on_click} text="Like" />
            </div>
        </>
        )
    }
}

Buttons.propTypes = {
    user_id: PropTypes.string.isRequired,
    on_click: PropTypes.func.isRequired,
}