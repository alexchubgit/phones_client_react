import React, { Component } from 'react';

import Header from './Header';
import Left from './Left';
import Right from './Right';
import Footer from './Footer';
import Center from './Center';

class User extends Component {

    render() {
        return (

            <div className="container">
                <Header />
                <Left />
                <Right />
                <Footer />
                <Center />
            </div>

        );
    }
}

export default User;