import React, { Component } from "react";
import axios from "axios";

import Header from './Header';
import Left from './Left';
import Right from './Right';
import Footer from './Footer';
import Center from './Center';

//const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:4200'

class Protected extends Component {

  componentDidMount() {

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.props.history.push('/login/');
    }

    // axios.get(`/getuser`, {
    //   headers: {
    //     'Authorization': `token ${token}`
    //   }
    // })
    //   .then(res => {

    //     console.log(res.data);

    //     this.setState({
    //       user: res.data
    //     });
    //   })
    //   .catch(error => {
    //     localStorage.removeItem('jwtToken');
    //     this.props.history.push('/login/');
    //   })
  }

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

export default Protected;