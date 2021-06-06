import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Right extends Component {

    render() {
        return (

            <div className="right">
                <aside>
                    <p><NavLink to="/user/birthday"> Дни рождения </NavLink></p>
                </aside>
            </div>

        );
    }
}

export default Right;