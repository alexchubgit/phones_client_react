import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class SearchResults extends Component {

    render() {

        const list = this.props.data;

        return (

            <div className="searchresults">

                {list && list.map(data =>
                    <p key={data.idperson}>
                        <NavLink to={`/user/one_person/${data.idperson}`} onClick={() => { this.props.updateDataSearch() }}>{data.name} - {data.sdep}</NavLink>
                    </p>

                )}

            </div>
        );
    }
}

export default SearchResults