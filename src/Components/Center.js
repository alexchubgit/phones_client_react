import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import BirthDay from './BirthDay';
import Persons from './Persons';
import OnePerson from './OnePerson';
import About from './About';
import Search from './Search';
//import Page404 from './Page404';

class Center extends Component {

    render() {
        return (

            <div className="center">
                <main>
                    <Switch>
                        <Route path="/user/birthday" component={BirthDay} />
                        <Route path="/user/persons/:iddep" component={Persons} />
                        <Route path="/user/about" component={About} />
                        <Route path="/user/search" component={Search} />
                        <Route path="/user/one_person/:idperson" component={OnePerson} />
                        <Redirect to="/user" />
                    </Switch>
                </main>
            </div>

        );
    }
}

export default Center;