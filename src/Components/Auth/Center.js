import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import Persons from './Persons';
import Dismissed from './Dismissed';
import OnePerson from './OnePerson';
import Search from './Search';
//import Page404 from './Page404';

import AddPerson from './Add/AddPerson.js';
import AddAddr from './Add/AddAddr.js';
import AddDep from './Add/AddDep.js';
import AddPlace from './Add/AddPlace.js';
import AddPos from './Add/AddPos.js';
import AddRank from './Add/AddRank.js';

import EditPerson from './Edit/EditPerson.js';
import EditDismissed from './Edit/EditDismissed.js';
import EditAddr from './Edit/EditAddr.js';
import EditDep from './Edit/EditDep.js';
import EditPlace from './Edit/EditPlace.js';
import EditPos from './Edit/EditPos.js';
import EditRank from './Edit/EditRank.js';

import Pos from './Pos';
import Rank from './Rank';
import Dep from './Dep';
import Addr from './Addr';
import Place from './Place';


class Center extends Component {

    render() {
        return (

            <div className="center">
                <main>

                    <Switch>
                        <Route path="/admin/persons/:iddep" component={Persons} />
                        <Route path="/admin/search" component={Search} />
                        <Route path="/admin/one_person/:idperson" component={OnePerson} />
                        <Route path="/admin/dismissed" component={Dismissed} />

                        <Route path="/admin/pos/" component={Pos} />
                        <Route path="/admin/rank/" component={Rank} />
                        <Route path="/admin/dep/" component={Dep} />
                        <Route path="/admin/place/:idaddr" component={Place} />
                        <Route path="/admin/addr/" component={Addr} />

                        <Route path="/admin/add_person/" component={AddPerson} />
                        <Route path="/admin/add_addr/" component={AddAddr} />
                        <Route path="/admin/add_dep/" component={AddDep} />
                        <Route path="/admin/add_place/" component={AddPlace} />
                        <Route path="/admin/add_pos/" component={AddPos} />
                        <Route path="/admin/add_rank/" component={AddRank} />

                        <Route path="/admin/edit_person/:idperson" component={EditPerson} />
                        <Route path="/admin/edit_dismissed/:idperson" component={EditDismissed} />
                        <Route path="/admin/edit_addr/:idaddr" component={EditAddr} />
                        <Route path="/admin/edit_dep/:iddep" component={EditDep} />
                        <Route path="/admin/edit_place/:idplace" component={EditPlace} />
                        <Route path="/admin/edit_pos/:idpos" component={EditPos} />
                        <Route path="/admin/edit_rank/:idrank" component={EditRank} />

                        <Redirect to="/admin" />
                    </Switch>
                </main>
            </div>

        );
    }
}

export default Center;