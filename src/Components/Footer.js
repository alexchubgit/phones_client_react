import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Footer extends Component {

    render() {
        return (

            <div className="footer">
                <footer>
                    <span className="copy-right">&copy; </span>
                    <span>2021 Алексей В. Чуб</span>
                    <div>
                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/alexchubgit">GitHub</a> |
                        <NavLink to="/user/about"> О справочнике </NavLink> |
                        <NavLink to="/login"> Авторизация </NavLink> 

                    </div>
                </footer>
            </div>

        );
    }

}

export default Footer;