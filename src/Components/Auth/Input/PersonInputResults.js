import React, { Component } from 'react';

class PersonInputResults extends Component {

    render() {
        const list = this.props.data;
        return (
            <div>
                {list && list.map(data =>
                    <p key={data.idperson.toString()} onClick={() => { this.props.updateDataPerson(data) }}>{data.name}</p>
                )}
            </div>
        );
    }
}

export default PersonInputResults