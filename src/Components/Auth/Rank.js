import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Rank extends Component {

    state = {
        data: []
    };

    componentDidMount() {

        axios.get(`/ranks`)
            .then(res => {
                const response = res.data;
                this.setState({
                    data: response
                });
            })

    }

    deleteRank = (idrank) => {
        //console.log(idrank);

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.delete(`/del_rank`, {
            headers: { 'Authorization': `${token}` },
            params: { idrank: idrank }
        })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
            })

        //alert('Запрос отправлен');
    }

    render() {

        const { data } = this.state;

        return (

            <div>
                <h2>Звания</h2>

                {data && data.map(data =>
                    <div key={data.idrank} style={{ marginBottom: 10 + 'px' }}>
                        <div>{data.rank}</div>

                        <NavLink to={`/admin/edit_rank/${data.idrank}`}>
                            <button type="button">редактировать</button>
                        </NavLink>

                        <button onClick={() => this.deleteRank(data.idrank)}>удалить</button>

                    </div>
                )
                }

            </div>

        );
    }
}

export default Rank;