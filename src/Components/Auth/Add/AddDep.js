import React, { Component } from 'react';
import axios from "axios";
import DepInputResults from '../Input/DepInputResults';
import AddrInputResults from '../Input/AddrInputResults';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class AddDep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            depart: "",
            sdep: "",
            email: "",
            idparent: "",
            parent: "",
            idaddr: "",
            addr: "",
            deparray: [],
            addrarray: [],
            isActiveAddr: false,
            isActiveDep: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    updateDataAddr = value => {
        this.setState({
            idaddr: value.idaddr,
            addr: value.addr,
            isActiveAddr: false
        }, () => {
            //this.search.value = value
        })
        //console.log(value)
    }

    updateDataDep = value => {
        this.setState({
            idparent: value.iddep,
            parent: value.sdep,
            isActiveDep: false
        }, () => {
            //this.search.value = value
        })
        //console.log(value)
    }

    handleChangeAddr = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActiveAddr: true
        }, () => {
            if (this.state.addr && this.state.addr.length > 1) {
                axios.get(`/list_addr?query=${this.state.addr}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            addrarray: response
                        });
                    })
            }
        })
    }

    handleChangeDep = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActiveDep: true
        }, () => {
            if (this.state.parent && this.state.parent.length > 1) {
                axios.get(`/list_dep?query=${this.state.parent}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            deparray: response
                        });
                    })
            }
        })
    }


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        console.log(token);

        const { depart } = this.state;
        const { sdep } = this.state;
        const { email } = this.state;
        const { idparent } = this.state;
        const { idaddr } = this.state;

        axios.post(`/add_dep`, { depart, sdep, email, idparent, idaddr }, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
                //this.props.history.push('/admin/dep/');
            })

        //alert('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Добавить подразделение</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="depart">Подразделение</label><br />
                            <input
                                required
                                name='depart'
                                className='input'
                                autoComplete='off'
                                value={this.state.depart}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="sdep">Короткое название</label><br />
                            <input
                                required
                                name='sdep'
                                className='input'
                                autoComplete='off'
                                value={this.state.sdep}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="email">Эл. почта</label><br />
                            <input
                                name='email'
                                placeholder='Эл. почта'
                                autoComplete='off'
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="parent">Подчинение</label><br />
                            <input
                                name="parent"
                                className=""
                                placeholder="Подчинение"
                                autoComplete='off'
                                value={this.state.parent}
                                onChange={this.handleChangeDep}
                            />
                            {this.state.isActiveDep ? (
                                this.state.parent ? <DepInputResults data={this.state.deparray} updateDataDep={this.updateDataDep} /> : null
                            ) : null
                            }
                        </li>
                        <li>
                            <label htmlFor='addr'>Адрес</label><br />
                            <input
                                name="addr"
                                placeholder="Адрес"
                                autoComplete='off'
                                value={this.state.addr}
                                onChange={this.handleChangeAddr}
                            />
                            {
                                this.state.isActiveAddr ? (
                                    this.state.addr ? <AddrInputResults data={this.state.addrarray} updateDataAddr={this.updateDataAddr} /> : null
                                ) : null
                            }
                        </li>
                        <li>
                            <input type='submit' value='Продолжить' />
                            <button onClick={this.cancelChange}>Отмена</button>
                        </li>
                    </ul>
                </form>
            </div >

        )
    }
}

export default AddDep;