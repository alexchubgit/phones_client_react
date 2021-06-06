import React, { Component } from 'react';
import PTitle from './PTitle';
import PApi from './PApi';

class Persons extends Component {

    render() {
        return (

            <div>

                <PTitle iddep={this.props.match.params.iddep} />
                <PApi iddep={this.props.match.params.iddep} />

            </div>

        );

    }
}

export default Persons;