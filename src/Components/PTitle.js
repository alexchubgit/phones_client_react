import React, { Component } from 'react';
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class PTitle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    componentDidMount() {

        const iddep = this.props.iddep;

        axios.get(`/one_dep?iddep=${iddep}`)
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

            axios.get(`/one_dep?iddep=${iddep}`)
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
                <div className="title" key={data.iddep}>
                    <div className="dep">{data.depart}</div>
                    <div className="addr">{data.postcode}, {data.addr}</div>
                    <div className="email">
                        <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer">{data.email}</a>
                    </div>
                    <div className="count">Сотрудников в подразделении: {data.count}</div>
                </div>
            </div>
        );
    }
}

export default PTitle;

//{data.map(data =>  )}
