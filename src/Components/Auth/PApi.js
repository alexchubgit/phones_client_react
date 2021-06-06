import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class PApi extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {

        const iddep = this.props.iddep;

        axios.get(`/persons?iddep=${iddep}`)
            .then(res => {
                const response = res.data;

                this.setState({
                    data: response
                });
            })
    }

    componentDidUpdate(prevProps) {

        const iddep = this.props.iddep;

        if (prevProps.iddep !== this.props.iddep) {

            axios.get(`/persons?iddep=${iddep}`)
                .then(res => {
                    const response = res.data;

                    this.setState({
                        data: response
                    });

                })
        }
    }

    render() {

        const { data } = this.state;

        return (

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

                            <NavLink to={`/admin/one_person/${data.idperson}`}>подробнее...</NavLink>

                        </div>
                    </div>
                )
                }
            </div>

        );
    }
}

export default PApi;
