import React, { Component } from 'react';
import axios from "axios";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class AddPos extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pos: '',
            error: null,
            message: "Loading ..."
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    cancelChange = (event) => {
        event.preventDefault();

        this.props.history.push('/admin/pos/');
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        const { pos } = this.state;

        axios.post(`/add_pos`, { pos }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.props.history.push('/admin/pos/');
            })

        //alert('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Добавить должность</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="pos">Должность</label><br />
                            <input
                                name='pos'
                                placeholder='Должность'
                                autoComplete='off'
                                value={this.state.pos}
                                onChange={this.handleChange.bind(this)}
                            /><br />
                        </li>
                        <li>
                            <input type='submit' value='Продолжить' />
                            <button onClick={this.cancelChange}>Отмена</button>
                        </li>
                    </ul>
                </form>

            </div >

        );
    }
}

export default AddPos;