import React, { Component } from 'react';

class DepInputResults extends Component {

    render() {
        const list = this.props.data;
        return (
            <div>
                {list && list.map(data =>
                    <p key={data.iddep.toString()} onClick={() => { this.props.updateDataDep(data) }}>{data.sdep}</p>
                )}
            </div>
        );
    }
}

export default DepInputResults