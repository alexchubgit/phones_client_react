import React, { Component } from 'react';
import axios from "axios";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class EditAddress extends Component {

    constructor(props) {
        super(props);

        this.state = {
            idaddr: "",
            addr: "",
            postcode: "",
            lat: "",
            lng: ""
        }
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        const idaddr = this.props.match.params.idaddr;

        axios.get(`/one_addr?idaddr=${idaddr}`)
            .then(res => {

                this.setState({
                    addr: res.data.addr,
                    postcode: res.data.postcode,
                    lat: res.data.lat,
                    lng: res.data.lng,
                    idaddr: res.data.idaddr
                });
            })
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    cancelChange = (event) => {
        event.preventDefault();

        this.props.history.push('/admin/addr/');
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');

        const { idaddr, addr, postcode, lat, lng } = this.state;

        axios.put(`/upd_addr`, { idaddr, addr, postcode, lat, lng }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {

                let status = res.status;
                if (status === 200) {
                    //console.log(res.status);
                    //console.log(res.data);
                    this.props.history.push('/admin/addr/');
                }
            })
            .catch(error => {

                let status = error.response.status;
                if (status === 401) {
                    //console.log(error.response.status);
                    //console.log(error.response.data);
                    this.props.history.push('/login/');
                }

            })

        //console.log('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Редактировать адрес</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="addr">Адрес</label><br />
                            <input
                                name='addr'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.addr}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="postcode">Почтовый индекс</label><br />
                            <input
                                name='postcode'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.postcode}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="lat">Широта</label><br />
                            <input
                                name='lat'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.lat}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="lng">Долгота</label><br />
                            <input
                                name='lng'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.lng}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <input type='submit' value='Продолжить' />
                            <button onClick={this.cancelChange}>Отмена</button>
                        </li>
                    </ul>
                </form>
            </div>

        );
    }
}

export default EditAddress;