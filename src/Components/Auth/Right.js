import React, { Component } from 'react';
import { NavLink } from "react-router-dom";

class Right extends Component {

    render() {
        return (

            <div className="right">
                <aside>

                    <p>Добавить:</p>
                    <p>
                        <ul>
                            <li><NavLink to="/admin/add_person/"> сотрудника </NavLink></li>
                            <li><NavLink to="/admin/add_dep/"> подразделение </NavLink></li>
                            <li><NavLink to="/admin/add_place/"> рабочее место </NavLink></li>
                            <li><NavLink to="/admin/add_addr/"> адрес </NavLink></li>
                            <li><NavLink to="/admin/add_rank/"> звание </NavLink></li>
                            <li><NavLink to="/admin/add_pos/"> должность </NavLink></li>
                        </ul>
                    </p>

                    <p>Списки:</p>
                    <p>
                        <ul>
                            <li><NavLink to="/admin/pos/"> должности </NavLink></li>
                            <li><NavLink to="/admin/rank/"> звания </NavLink></li>
                            <li><NavLink to="/admin/addr/"> адреса </NavLink></li>
                            <li><NavLink to="/admin/dep/"> подразделения </NavLink></li>
                            <li><NavLink to="/admin/dismissed"> уволенные </NavLink></li>
                        </ul>
                    </p>

                </aside>
            </div>

        );
    }
}

export default Right;