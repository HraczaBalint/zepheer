import React from 'react';
import PropTypes from 'prop-types';

export default class Description extends React.Component{

    render() {

        const { user_name, user_age, user_description } = this.props;

        return(
        <>
            <h2>{user_name}, {user_age}</h2>
            <p>{user_description}</p>
        </>
        )
    }
}

Description.propTypes = {
    user_name: PropTypes.string.isRequired,
    user_age: PropTypes.number.isRequired,
    user_description: PropTypes.string.isRequired,
}