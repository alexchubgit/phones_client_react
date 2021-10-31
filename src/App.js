import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import LoginPage from './Components/Auth/LoginPage';
import Protected from './Components/Auth/Protected';
import User from './Components/User';
import Page404 from './Components/Page404';


class App extends Component {

  render() {
    return (

      <div>
        <Switch>
          <Route path="/user" component={User} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={Protected} />
          <Route path="*" component={Page404} />
        </Switch>
      </div>

    );
  }
}

export default App;