import React, { Component } from 'react';
import axios from 'axios';
import SearchResults from './SearchResults';

//const { API_KEY } = process.env
//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Search extends Component {

    state = {
        query: '',
        idperson: '',
        data: [],
        isActive: false
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
            isActive: true
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                axios.get(`/search?query=${this.state.query}`)
                    .then(res => {
                        const response = res.data;
                        this.setState({
                            data: response
                        });
                    })
            }
        })
    }

    updateDataSearch = value => {
        this.setState({
            isActive: false,
        }, () => {
        })
    }

    render() {
        return (

            <div className="search_block">

                <input
                    className="search"
                    name="query"
                    autoComplete='off'
                    placeholder="Сотрудники, телефоны"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />

                {
                    this.state.isActive ? (
                        this.state.query ? <SearchResults data={this.state.data} updateDataSearch={this.updateDataSearch} /> : null
                    ) : null
                }

            </div>

        );
    }
}

export default Search;