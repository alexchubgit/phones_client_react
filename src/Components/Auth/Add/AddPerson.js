import React, { Component } from 'react';
import axios from "axios";
import DepInputResults from '../Input/DepInputResults';
import PosInputResults from '../Input/PosInputResults';
import RankInputResults from '../Input/RankInputResults';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class AddPerson extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
            imagePreviewUrl: '/photo/photo.png',
            name: "",
            date: "1970-01-01",
            cellular: "",
            business: "",
            iddep: "0",
            dep: "",
            idpos: "0",
            pos: "",
            idrank: "0",
            rank: "",
            deparray: [],
            posarray: [],
            rankarray: [],
            isActiveDep: false,
            isActivePos: false,
            isActiveRank: false
        }
    }

    updateDataDep = value => {
        this.setState({
            iddep: value.iddep,
            dep: value.sdep,
            isActiveDep: false
        }, () => {
            //this.search.value = value
        })
        //console.log(value)
    }

    updateDataPos = value => {
        this.setState({
            idpos: value.idpos,
            pos: value.pos,
            isActivePos: false
        }, () => {
            //this.search.value = value
        })
        //console.log(value)
    }

    updateDataRank = value => {
        this.setState({
            idrank: value.idrank,
            rank: value.rank,
            isActiveRank: false
        }, () => {
            //this.search.value = value
        })
        //console.log(value)
    }

    handleChangeDep = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActiveDep: true
        }, () => {
            if (this.state.dep && this.state.dep.length > 1) {
                axios.get(`/list_dep?query=${this.state.dep}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            deparray: response
                        });
                    })
            }
        })
    }

    handleChangePos = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActivePos: true
        }, () => {
            if (this.state.pos && this.state.pos.length > 1) {
                axios.get(`/list_pos?query=${this.state.pos}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            posarray: response
                        });
                    })
            }
        })
    }

    handleChangeRank = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActiveRank: true
        }, () => {
            if (this.state.rank && this.state.rank.length > 1) {
                axios.get(`/list_rank?query=${this.state.rank}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            rankarray: response
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

    fileSelectedHandler = event => {

        let reader = new FileReader();
        let file = event.target.files[0];

        //???????????????? ???????? ??????????
        if (!file.type.match('image.*')) {
            alert("Image only please....");
        }

        reader.onloadend = () => {
            this.setState({
                selectedFile: file,
                //fileName: file.name,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
        //console.log(event.target.files[0]);
    }

    cancelChange = (event) => {
        event.preventDefault();
        const { iddep } = this.state;

        this.props.history.push('/admin/persons/' + iddep);
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        const { name } = this.state;
        const { date } = this.state;
        const { cellular } = this.state;
        const { business } = this.state;
        const { iddep } = this.state;
        const { idpos } = this.state;
        const { idrank } = this.state;
        const { selectedFile } = this.state;

        const fd = new FormData();

        fd.append('name', name);
        fd.append('date', date);
        fd.append('cellular', cellular);
        fd.append('business', business);
        fd.append('iddep', iddep);
        fd.append('idpos', idpos);
        fd.append('idrank', idrank);
        fd.append('file', selectedFile);

        axios.post(`/add_person`, fd, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                //console.log(res.data);
                //this.props.history.push('/admin/persons/' + iddep);
                const { iddep } = this.state;
                this.props.history.push('/admin/persons/' + iddep);
            })

        //alert('???????????? ??????????????????');
    }

    render() {
        return (

            <div className="form">
                <h2>???????????????? ????????????????????</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <img className="photo-cont-form" src={this.state.imagePreviewUrl} alt="" />
                        </li>
                        <li>
                            <label htmlFor='file'>????????</label><br />
                            <input
                                type="file"
                                className=""
                                name='files'
                                accept='image/*'
                                onChange={this.fileSelectedHandler}
                            />
                        </li>
                        <li>
                            <label htmlFor='name'>??.??.??.</label><br />
                            <input
                                required
                                name='name'
                                className='input'
                                autoComplete='off'
                                placeholder='???????????? ???????? ????????????????'
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor='date'>???????? ????????????????</label><br />
                            <input
                                name='date'
                                className=''
                                type='date'
                                value={this.state.date}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor='cellular'>??????.</label><br />
                            <input
                                name='cellular'
                                className='input'
                                autoComplete='off'
                                value={this.state.cellular}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor='business'>???????? ??????.</label><br />
                            <input
                                name='business'
                                className='input'
                                autoComplete='off'
                                value={this.state.business}
                                onChange={this.handleChange}
                            />
                        </li>
                        <li>
                            <label htmlFor="dep">??????????????????????????</label><br />
                            <input
                                name="dep"
                                className=""
                                autoComplete='off'
                                placeholder="??????????????????????????"
                                value={this.state.dep}
                                onChange={this.handleChangeDep}
                            />
                            {this.state.isActiveDep ? (
                                this.state.dep ? <DepInputResults data={this.state.deparray} updateDataDep={this.updateDataDep} /> : null
                            ) : null
                            }
                        </li>
                        <li>
                            <label htmlFor='pos'>??????????????????</label><br />
                            <input
                                name="pos"
                                className="pos"
                                autoComplete='off'
                                placeholder="??????????????????"
                                value={this.state.pos}
                                onChange={this.handleChangePos}
                            />
                            {this.state.isActivePos ? (
                                this.state.pos ? <PosInputResults data={this.state.posarray} updateDataPos={this.updateDataPos} /> : null
                            ) : null
                            }
                        </li>
                        <li>
                            <label htmlFor='rank'>????????????</label><br />
                            <input
                                name="rank"
                                className="rank"
                                autoComplete='off'
                                placeholder="????????????"
                                value={this.state.rank}
                                onChange={this.handleChangeRank}
                            />
                            {this.state.isActiveRank ? (
                                this.state.rank ? <RankInputResults data={this.state.rankarray} updateDataRank={this.updateDataRank} /> : null
                            ) : null
                            }
                        </li>
                        <li>
                            <input type='submit' value='????????????????????' />
                            <button onClick={this.cancelChange}>????????????</button>
                        </li>
                    </ul>
                </form>

            </div >

        );
    }
}

export default AddPerson;