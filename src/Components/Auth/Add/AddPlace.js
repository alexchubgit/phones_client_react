import React, { Component } from 'react';
import axios from "axios";
import AddrInputResults from '../Input/AddrInputResults';
import PersonInputResults from '../Input/PersonInputResults';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class AddPlace extends Component {

    constructor(props) {
        super(props);

        this.state = {
            place: "",
            work: "",
            internal: "",
            ipphone: "",
            arm: "",
            idaddr: "",
            addr: "",
            idperson: "",
            person: "",
            addrarray: [],
            personarray: [],
            isActiveAddr: false,
            isActivePerson: false,

            hoverStates: {} // or an array
        }

        this.handleChange = this.handleChange.bind(this);
    }


    // getInfo = () => {
    //     axios.get(`${API_URL_ADDR}?query=${this.state.query}`)
    //         .then(res => {
    //             const response = res.data;
    //             this.setState({
    //                 data: response
    //             });
    //         })
    // }


    // handleKeyUp(event) {
    //     if (event.keyCode == 13) return this.sendData()
    // }
    // render() {
    //     return <form onKeyUp={this.handleKeyUp}>
    //         …
    //     </form>
    // }


    updateDataAddr = value => {
        this.setState({
            idaddr: value.idaddr,
            addr: value.addr,
            isActiveAddr: false
        }, () => {
            //     //this.search.value = value
        })
        //console.log(value)
    }

    updateDataPerson = value => {
        this.setState({
            idperson: value.idperson,
            person: value.name,
            isActivePerson: false
        }, () => {
            //     //this.search.value = value
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

    handleChangePerson = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActivePerson: true
        }, () => {
            if (this.state.person && this.state.person.length > 1) {
                axios.get(`/list_persons?query=${this.state.person}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            personarray: response
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

    cancelChange = (event) => {
        event.preventDefault();
        const { idaddr } = this.state;

        this.props.history.push('/admin/place/' + idaddr);
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        const { place } = this.state;
        const { arm } = this.state;
        const { ipphone } = this.state;
        const { internal } = this.state;
        const { work } = this.state;
        const { idaddr } = this.state;
        const { idperson } = this.state;

        axios.post(`/add_place`, { idaddr, idperson, place, arm, ipphone, internal, work }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.props.history.push('/admin/place/' + idaddr);
            })

        //alert('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Добавить рабочее место</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="place">Рабочее место</label><br />
                            <input
                                name='place'
                                placeholder='Рабочее место'
                                autoComplete='off'
                                value={this.state.place}
                                onChange={this.handleChange}
                            /><br />
                        </li>
                        <li>
                            <label htmlFor=''>Внешний тел</label><br />
                            <input
                                name='work'
                                placeholder='Внешний тел'
                                autoComplete='off'
                                value={this.state.work}
                                onChange={this.handleChange}
                            /><br />
                        </li>
                        <li>
                            <label htmlFor='internal'>Внутренний тел</label><br />
                            <input
                                name='internal'
                                placeholder='Внутренний тел'
                                autoComplete='off'
                                value={this.state.internal}
                                onChange={this.handleChange}
                            /><br />
                        </li>
                        <li>
                            <label htmlFor='ipphone'>ip тел</label><br />
                            <input
                                name='ipphone'
                                placeholder='ip тел'
                                autoComplete='off'
                                value={this.state.ipphone}
                                onChange={this.handleChange}
                            /><br />
                        </li>
                        <li>
                            <label htmlFor="arm">АРМ</label><br />
                            <input
                                name='arm'
                                placeholder='АРМ'
                                autoComplete='off'
                                value={this.state.arm}
                                onChange={this.handleChange}
                            /><br />
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
                            <label htmlFor='person'>Сотрудник</label><br />
                            <input
                                name="person"
                                placeholder="Сотрудник"
                                autoComplete='off'
                                value={this.state.person}
                                onChange={this.handleChangePerson}
                            />
                            {
                                this.state.isActivePerson ? (
                                    this.state.person ? <PersonInputResults data={this.state.personarray} updateDataPerson={this.updateDataPerson} /> : null
                                ) : null
                            }
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

export default AddPlace;