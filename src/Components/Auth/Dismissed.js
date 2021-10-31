import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Dismissed extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        axios.get(`/dismissed`)
            .then(res => {
                const response = res.data;

                this.setState({
                    data: response
                });
            })
    }

    deletePerson = (idperson) => {

        //console.log(idperson);

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.delete(`/del_person`, {
            headers: { 'Authorization': `${token}` },
            params: { idperson: idperson }
        })
            .then(res => {
                console.log(res.data);
                //this.props.history.push('/admin/persons/' + iddep);
                window.location.reload(false);
            })

        //alert('Запрос отправлен');
    }

    render() {

        const { data } = this.state;

        return (

            <div>
                <div>
                    <h2>Уволенные</h2>
                </div>

                {data && data.map(data =>
                    <div className="person">
                        <div>
                            <img className="photo-cont" src={`/photo/` + data.file} alt="фото" />
                        </div>
                        <div>
                            <div className="name">{data.name}</div>
                            <div className="pos">{data.pos}</div>
                            <div className="rank">{data.rank}</div>
                            <div className="date">{data.date}</div>
                            <div className="phone">{data.cellular}</div>

                            <div>
                                <NavLink to={`/admin/edit_dismissed/${data.idperson}`}>
                                    <button type="button">восстановить</button>
                                </NavLink>

                                <button onClick={() => this.deletePerson(data.idperson)}>удалить</button>

                            </div>
                        </div>
                    </div>
                )
                }
            </div>

        );
    }
}

export default Dismissed;
