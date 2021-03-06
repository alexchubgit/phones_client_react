import React, { Component } from 'react';
import axios from "axios";
import DepInputResults from '../Input/DepInputResults';
import AddrInputResults from '../Input/AddrInputResults';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class EditDep extends Component {

    constructor(props) {
        super(props);

        this.state = {
            depart: "",
            sdep: "",
            email: "",
            parent: "",
            idparent: "",
            addr: "",
            iddep: "",
            idaddr: "",
            deparray: [],
            addrarray: [],
            isActiveAddr: false,
            isActiveDep: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        const iddep = this.props.match.params.iddep;

        axios.get(`/one_dep?iddep=${iddep}`)
            .then(res => {

                this.setState({
                    addr: res.data.addr,
                    email: res.data.email,
                    sdep: res.data.sdep,
                    depart: res.data.depart,
                    parent: res.data.parent,
                    iddep: res.data.iddep,
                    idaddr: res.data.idaddr,
                    idparent: res.data.idparent
                });
            })
        //const { pos } = this.props;
        //this.setState({ pos });
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

    cancelChange = (event) => {
        event.preventDefault();

        this.props.history.push('/admin/dep/');
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        console.log(token);

        const { depart } = this.state;
        const { sdep } = this.state;
        const { email } = this.state;
        const { iddep } = this.state;
        const { idaddr } = this.state;
        const { idparent } = this.state;

        axios.put(`/upd_dep`, { depart, sdep, email, iddep, idaddr, idparent }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                window.location.reload(false);
                //this.props.history.push('/admin/dep/');
            })

        //alert('???????????? ??????????????????');
    }

    render() {
        return (

            <div className="form">
                <h2>?????????????????????????? ??????????????????????????</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="depart">??????????????????????????</label><br />
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
                            <label htmlFor="sdep">???????????????? ????????????????</label><br />
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
                            <label htmlFor="email">????. ??????????</label><br />
                            <input
                                name='email'
                                placeholder='????. ??????????'
                                autoComplete='off'
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="parent">????????????????????</label><br />
                            <input
                                name="parent"
                                className=""
                                placeholder="????????????????????"
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
                            <label htmlFor='addr'>??????????</label><br />
                            <input
                                name="addr"
                                placeholder="??????????"
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
                            <input type='submit' value='????????????????????' />
                            <button onClick={this.cancelChange}>????????????</button>
                        </li>
                    </ul>
                </form>
            </div>

        );
    }
}

export default EditDep;