import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Dep extends Component {

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

    deleteDep = (iddep) => {
        //console.log(iddep);

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.delete(`/del_dep`, {
            headers: { 'Authorization': `${token}` },
            params: { iddep: iddep }
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
                <h2>Подразделения</h2>

                {data && data.map(data =>
                    <div key={data.iddep} style={{ marginBottom: 10 + 'px' }}>
                        <div>{data.sdep}</div>

                        <NavLink to={`/admin/edit_dep/${data.iddep}`}>
                            <button type="button">редактировать</button>
                        </NavLink>

                        <button onClick={() => this.deleteDep(data.iddep)}>удалить</button>

                    </div>
                )
                }
            </div>

        );
    }
}

export default Dep;