import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

class BirthWeek extends Component {

    state = {
        data: []
    };

    componentDidMount() {

        axios.get(`/dates`)
            .then(res => {
                const response = res.data;
                this.setState({
                    data: response
                });
            })
    }

    render() {

        const { data } = this.state;

        return (

            <div>
                <h4>В течение недели</h4>

                <div>
                    {data && data.map(data =>
                        <div className="person" key={data.idperson}>
                            <div>
                                <img className="photo-cont" src={`/photo/` + data.file} alt="фото" />
                            </div>
                            <div>
                                <div className="name">{data.name}</div>
                                <div className="pos">{data.pos}</div>
                                <div className="rank">{data.rank}</div>
                                <div className="date">{data.date}</div>

                                <NavLink to={`/user/one_person/${data.idperson}`}>подробнее...</NavLink>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>

        );
    }
}

export default BirthWeek;