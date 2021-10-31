import React, { Component } from "react";
import axios from "axios";

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class LoginPage extends Component {

    state = {
        //localToken: null,
        username: "",
        password: "",
        message: "",
        //error: null
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    loginHandle = () => {

    }

    onFormSubmit = (event) => {
        event.preventDefault();
        //alert('Запрос отправлен');

        axios.post(`/login`, {
            login: this.state.username,
            password: this.state.password
        })
            .then((res) => {

                console.log(res.data)

                if (res.status === 200) {
                    //console.log(res);
                    //console.log(res.data);
                    this.setState({
                        //localToken: res.data.token,
                        message: res.data.message
                    });
                    //проверить существование токена
                    if (res.data.token) {
                        localStorage.setItem('jwtToken', res.data.token);
                        this.props.history.push('/admin');
                    }
                }

            }, (error) => {
                this.setState({
                    message: 'API недоступен'
                });
                //console.log(error);
            });

    }

    render() {
        return (
            <div className="loginpage">
                <div className="logoimg"></div><br />
                <form onSubmit={this.onFormSubmit}>
                    <div>
                        <label>Username
                        <input className="login"
                                name='username'
                                autoComplete='off'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <label>Password
                        <input className="password"
                                type='password'
                                name='password'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                    <div>
                        <input className="btn" type='submit' />
                    </div>

                </form>

                <p>Message: {this.state.message}</p>
            </div>
        );
    }
}

export default LoginPage;