import React from 'react';
import PropTypes from 'prop-types';


export default class Button extends React.Component{

    render() {

        const {text, type = "button", on_click} = this.props;

        return(
        <>
            <button onClick={on_click} type={type}>{text}</button>
        </>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    on_click: PropTypes.func.isRequired,
}