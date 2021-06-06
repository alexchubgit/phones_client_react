import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Left extends Component {

    state = {
        data: []
    };

    componentDidMount() {

        axios.get(`/deps`)
            .then(res => {
                const response = res.data;

                this.setState({
                    data: response
                });
            })
    }

    leftList = (data, idparent) => {

        let iddep;
        let list = [];

        data && data.map(item => {
            if (item.idparent === idparent) {
                iddep = item.iddep;
                list.push(<li key={item.iddep.toString()}><NavLink to={`/user/persons/${item.iddep}`}>{item.sdep}</NavLink></li>);
                list.push(this.leftList(data, iddep));
            } return null
        })

        return (

            <ul>
                {list}
            </ul>

        )
    }

    render() {

        const { data } = this.state;

        return (

            <div className="left">
                <nav>
                    {this.leftList(data, 0)}
                </nav>
            </div>
        );
    }
}

export default Left;