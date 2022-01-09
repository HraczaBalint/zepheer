import React from 'react';
import Picture from './Picture';
import PropTypes from 'prop-types';

export default class Pictures extends React.Component{

    render() {

        const { pictures } = this.props;

        const pictures_splited =  pictures[0].split(',');

        return(
        <>
            <div className='pictures'>
                {
                    pictures_splited.map((picture) => <Picture src={picture} />)
                }
            </div>
        </>
        )
    }
}

Pictures.propTypes = {
    pictures: PropTypes.arrayOf(PropTypes.string).isRequired,
}