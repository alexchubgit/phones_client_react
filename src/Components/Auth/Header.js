import React, { Component } from 'react';
//import prok from '../images/prok.png';
import Search from './Search';

class Header extends Component {

    render() {
        return (

            <div className="header">
                <header>
                    <div className="logo_text">ТС_</div>
                    <Search />
                </header>
            </div>

        );
    }
}

export default Header;