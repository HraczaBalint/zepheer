import React from 'react';
import Button from './Button';
import PropTypes from 'prop-types';


export default class Buttons extends React.Component{

    render() {

        const { on_click } = this.props;

        return(
        <>
            <div className='buttons'>
                <Button on_click={on_click} text="Dislike" value={0} />
                <Button on_click={on_click} text="Like" value={1} />
            </div>
        </>
        )
    }
}

Buttons.propTypes = {
    on_click: PropTypes.func.isRequired,
}