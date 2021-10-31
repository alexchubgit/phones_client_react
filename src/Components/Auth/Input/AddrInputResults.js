import React, { Component } from 'react';

class AddrInputResults extends Component {
 
    render() {
        const list = this.props.data;
        return (
            <div>
                {list && list.map(data =>
                    <p key={data.idaddr.toString()} onClick={() => { this.props.updateDataAddr(data) }}>{data.addr}</p>
                )}
            </div>
        );
    }
}

export default AddrInputResults