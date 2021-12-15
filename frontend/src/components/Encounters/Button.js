import React from 'react';
import PropTypes from 'prop-types';


export default class Button extends React.Component{

    render() {

        const {text, type = "button"} = this.props;

        return(
        <>
            <button type={type}>{text}</button>
        </>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
}