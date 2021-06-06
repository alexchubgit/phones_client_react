import React, { Component } from 'react';
import axios from "axios";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class AddAddr extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addr: "",
            postcode: "",
            lat: "",
            lng: ""
        }
    }

    formClear = () => {
        this.setState({
            addr: "",
            postcode: "",
            lat: "",
            lng: ""
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        //this.formClear();

        const { addr } = this.state;
        const { postcode } = this.state;
        const { lat } = this.state;
        const { lng } = this.state;

        axios.post(`/add_addr`, { addr, postcode, lat, lng }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                //console.log(res.status);
                //console.log(res.data.message);
                this.props.history.push('/admin/addr/');
            })

        //alert('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Добавить адрес</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="addr">Адрес</label><br />
                            <input
                                required
                                name='addr'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.addr}
                                onChange={this.handleChange.bind(this)}
                            />
                        </li>
                        <li>
                            <label htmlFor="postcode">Почтовый индекс</label><br />
                            <input
                                required
                                name='postcode'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.postcode}
                                onChange={this.handleChange.bind(this)}
                            />
                        </li>
                        <li>
                            <label htmlFor="lat">Широта</label><br />
                            <input
                                required
                                name='lat'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.lat}
                                onChange={this.handleChange.bind(this)}
                            />
                        </li>
                        <li>
                            <label htmlFor="lng">Долгота</label><br />
                            <input
                                required
                                name='lng'
                                className='input'
                                type='text'
                                autoComplete='off'
                                value={this.state.lng}
                                onChange={this.handleChange.bind(this)}
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

export default AddAddr;