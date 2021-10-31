import React, { Component } from 'react';
import axios from "axios";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class EditRank extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            idrank: "",
            rank: ""
        }
    }

    componentDidMount() {

        window.scrollTo(0, 0);

        const idrank = this.props.match.params.idrank;

        axios.get(`/one_rank?idrank=${idrank}`)
            .then(res => {

                this.setState({
                    rank: res.data.rank,
                    idrank: res.data.idrank
                });
            })
        //const { rank } = this.props;
        //this.setState({ rank });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    cancelChange = (event) => {
        event.preventDefault();

        this.props.history.push('/admin/rank/');
    }

    onFormSubmit = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('jwtToken');
        //console.log(token);

        const { idrank, rank } = this.state;

        axios.put(`/upd_rank`, { idrank, rank }, {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(res => {
                console.log(res.data);
                this.props.history.push('/admin/rank/');
            })

        //alert('Запрос отправлен');
    }

    render() {
        return (

            <div className="form">
                <h2>Редактировать звание</h2>

                <form onSubmit={this.onFormSubmit}>
                    <ul>
                        <li>
                            <label htmlFor="rank">Звание</label><br />
                            <input
                                name='rank'
                                placeholder='Звание'
                                autoComplete='off'
                                value={this.state.rank}
                                onChange={this.handleChange}
                            /><br />
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

export default EditRank;