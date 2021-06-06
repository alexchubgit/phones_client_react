import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Place extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        const idaddr = this.props.match.params.idaddr;

        axios.get(`/places?idaddr=${idaddr}`)
            .then(res => {
                const response = res.data;
                this.setState({
                    data: response
                });
            })
    }

    deletePlace = (idplace) => {
        //console.log(idplace);

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.delete(`/del_place`, {
            headers: { 'Authorization': `${token}` },
            params: { idplace: idplace }
        })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
            })

        //alert('Запрос отправлен');
    }

    cleanPlace = (idplace) => {
        //alert("Очищаю место");

        const token = localStorage.getItem('jwtToken');
        console.log(token + ' ' + idplace);

        axios.put(`/del_person_place`, { idplace }, {
            headers: {
                'Authorization': `token ${token}`
            }
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
                <h2>Рабочие места</h2>

                {data && data.map(data =>
                    <div key={data.idplace}>
                        <br></br>

                        <div>{data.place}</div>
                        <div>{data.name}</div>
                        <div>{data.work}</div>
                        <div>{data.ipphone}</div>
                        <div>{data.internal}</div>

                        <div>
                            <br />
                            <div>
                                <NavLink to={`/admin/edit_place/${data.idplace}`}>
                                    <button type="button">редактировать</button>
                                </NavLink>

                                <button onClick={() => this.deletePlace(data.idplace)}>удалить</button>

                                <button onClick={() => this.cleanPlace(data.idplace)}>очистить место</button>

                            </div>
                        </div>
                    </div>
                )
                }

            </div>

        );
    }
}

export default Place;