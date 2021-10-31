import React, { Component } from 'react';

class RankInputResults extends Component {

    render() {
        const list = this.props.data;
        return (
            <div>
                {list && list.map(data =>
                    <p key={data.idrank.toString()} onClick={() => { this.props.updateDataRank(data) }}>{data.rank}</p>
                )}
            </div>
        );
    }
}

export default RankInputResults