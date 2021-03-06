import React from 'react';
import Picture from '../Picture';
import PropTypes from 'prop-types';

export default class Pictures extends React.Component{

    render() {

        const { pictures } = this.props;

        const pictures_splitted =  pictures[0].split('|');

        return(
        <>
            {pictures_splitted.map((picture) => <Picture key={picture} src={picture} />)}
        </>
        )
    }
}

Pictures.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}