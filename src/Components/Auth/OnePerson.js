import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class OnePerson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {}
        }
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        const idperson = this.props.match.params.idperson;

        axios.get(`/one_person?idperson=${idperson}`)
            .then(res => {
                const response = res.data;
                this.setState({
                    data: response
                });
            })
    }

    componentDidUpdate(prevProps) {

        window.scrollTo(0, 0);

        const idperson = this.props.match.params.idperson;
        const lastidperson = prevProps.match.params.idperson;

        if (lastidperson !== idperson) {

            axios.get(`/one_person?idperson=${idperson}`)
                .then(res => {
                    const response = res.data;
                    this.setState({
                        data: response
                    });
                })
        }
    }

    dismissPerson = (idperson) => {

        //console.log(idperson);

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        axios.put(`/dismiss`, { idperson }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.props.history.push('/admin/dismissed/');
                //window.location.reload(false);
            })

        //alert('Запрос отправлен');
    }

    render() {

        const { data } = this.state;

        return (

            <div>
                <h2>Информация о сотруднике</h2>

                <div className="person" key={data.idperson}>
                    <div>
                        <img className="photo-cont" src={`/photo/` + data.file} alt="фото" />
                    </div>
                    <div>
                        <div className="name">{data.name}</div>
                        <div className="pos">{data.pos}</div>
                        <div className="rank">{data.rank}</div>
                        <div className="date">{data.date}</div>
                        <br />
                        <div className="info">
                            <div className="work">раб.: {data.work}</div>
                            <div className="internal">внутр.: {data.internal}</div>
                            <div className="ipphone">ip тел.: <a href={`tel:${data.ipphone}`}>{data.ipphone}</a></div>
                            <div className="business">служ.: {data.business}</div>
                            <div className="cellular">сот.: {data.cellular}</div>
                            <div className="place">место: {data.place}</div>
                            <div className="arm">АРМ: {data.arm}</div>
                        </div>
                        <br />
                        <div><NavLink to={`/admin/persons/${data.iddep}`}>{data.depart}</NavLink></div>

                        <div>
                            <br />
                            <div>
                                <NavLink to={`/admin/edit_person/${data.idperson}`}>
                                    <button type="button">редактировать</button>
                                </NavLink>

                                <button onClick={() => this.dismissPerson(data.idperson)}>уволить</button>

                            </div>
                        </div>
                    </div>

                </div>
               
            </div>

        );
    }
}

export default OnePerson;