import React from 'react';
import PropTypes from 'prop-types';


export default class Button extends React.Component{

    newRating = () => {
        
        const { on_click, value } = this.props;

        on_click(value);
    }

    render() {

        const {text, type = "button"} = this.props;

        return(
        <>
            <button onClick={this.newRating} type={type}>{text}</button>
        </>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    on_click: PropTypes.func.isRequired,
}