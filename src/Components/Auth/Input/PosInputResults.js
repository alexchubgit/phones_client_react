import React, { Component } from 'react';

class PosInputResults extends Component {

    render() {
        const list = this.props.data;
        return (
            <div>
                {list && list.map(data =>
                    <p key={data.idpos.toString()} onClick={() => { this.props.updateDataPos(data) }}>{data.pos}</p>
                )}
            </div>
        );
    }
}

export default PosInputResults