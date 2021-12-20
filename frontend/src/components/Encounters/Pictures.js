import React from 'react';
import Picture from './Picture';
import PropTypes from 'prop-types';

export default class Pictures extends React.Component{

    render() {

        const { pictures } = this.props;

        return(
        <>
            <div className='pictures'>
                {
                    pictures.map((picture) => <Picture src={picture} />)
                }
            </div>
        </>
        )
    }
}

Pictures.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}