import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        };
    }

    handleLogout = () => {
        //alert('Выход')
        //localStorage.removeItem('jwtToken');
        localStorage.clear();
        this.setState({ redirect: true });
        //window.location.href = '/#/user/';

    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={'/User'} />
            )
        } else {
            return (

                <div className="footer">
                    <footer>
                        <span className="copy-right">&copy;</span>
                        <span>2021 Алексей В. Чуб</span>
                        <div>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexchubgit">GitHub</a> |
                            <button onClick={() => this.handleLogout()}>Выход</button>

                        </div>
                    </footer>
                </div>

            );
        }
    }

}

export default Footer;