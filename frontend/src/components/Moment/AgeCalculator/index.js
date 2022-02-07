import React  from 'react';
import Moment from 'react-moment';

export default class AgeCalculator extends React.Component {
    render() {
        return (
            <Moment fromNow ago>{this.props.date}</Moment>
        );
    }
}