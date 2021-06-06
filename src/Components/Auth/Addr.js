import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Addr extends Component {

    state = {
        data: []
    };

    componentDidMount() {

        const token = localStorage.getItem('jwtToken');
        console.log(token);

        axios.get(`/addr`, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(res => {
                const response = res.data;

                this.setState({
                    data: response
                });

                //console.log(res.message);
            })
    }

    deleteAddr = (idaddr) => {

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.delete(`/del_addr`, {
            headers: { 'Authorization': `${token}` },
            params: { idaddr: idaddr }
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
                <h2>Адреса</h2>

                {data && data.map(data =>
                    <div key={data.idaddr.toString()} style={{ marginBottom: 10 + 'px' }}>
                        <div>{data.addr}</div>
                        <div>{data.postcode}</div>
                        <div>lat: {data.lat} lng: {data.lng}</div>

                        <NavLink to={`/admin/place/${data.idaddr}`}>
                            <button type="button">раб. места</button>
                        </NavLink>

                        <NavLink to={`/admin/edit_addr/${data.idaddr}`}>
                            <button type="button">редактировать</button>
                        </NavLink>

                        <button onClick={() => this.deleteAddr(data.idaddr)}>удалить</button>

                    </div>
                )
                }

            </div>

        );
    }
}

export default Addr;