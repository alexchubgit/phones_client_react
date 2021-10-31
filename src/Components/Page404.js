import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Page404 extends Component {

    render() {
        return (

            <div className="">
                <h1>ошибка 404</h1>
                <h2>Страница не найдена</h2>
                <Link to="/user">Return to Home Page</Link>
            </div>

        );
    }
}

export default Page404;