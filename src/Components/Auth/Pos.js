import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Pos extends Component {

    state = {
        data: []
    };

    componentDidMount() {

        axios.get(`/pos`)
            .then(res => {
                const response = res.data;
                this.setState({
                    data: response
                });
            })
    }

    deletePos = (idpos) => {
        
        const token = localStorage.getItem('jwtToken');
        //console.log(token);
        //console.log(idpos);

        axios.delete(`/del_pos`, {
            params: { idpos: idpos },
            headers: { Authorization: `${token}` }           
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
                <h2>Должности</h2>

                {data && data.map(data =>
                    <div key={data.idpos.toString()} style={{ marginBottom: 10 + 'px' }}>
                        <div>{data.pos}</div>

                        <NavLink to={`/admin/edit_pos/${data.idpos}`}>
                            <button type="button">редактировать</button>
                        </NavLink>

                        <button onClick={() => this.deletePos(data.idpos)}>удалить</button>

                    </div>
                )
                }
            </div>

        );
    }
}

export default Pos;