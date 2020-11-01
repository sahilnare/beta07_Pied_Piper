import React, { Component } from 'react';
import './app.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/features/Chatbot';
import DoctorChat from './pages/features/DoctorChat';
import Covid from './pages/features/Covid';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      isAuthenticated: false,
      user: '',
      errors: ''
    }
  }

  componentDidMount() {
  }

  login = (cred) => {
    axios.post('/api/auth/login', cred, {
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
      this.setState({user: res.data, isAuthenticated: true});
    }).catch(err => {
      console.log(err.response.data);
    });
  }

  signup = (cred) => {
    this.setState({username: cred.username, isAuthenticated: true});
  }

  logout = () => {
    this.setState({user: null, isAuthenticated: false});
  }

  render() {
    const { message, isAuthenticated } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar logout={this.logout} user={this.state.user} logout={this.logout} />
          <Switch>
            <Route
              path='/'
              exact
              render={(props) => !isAuthenticated ? <Home message={message} {...props} /> : <Redirect to='/dashboard' />}
            />
            <Route
              path='/dashboard'
              exact
              render={(props) => isAuthenticated ? <Dashboard user={this.state.user} {...props} /> : <Redirect to='/login' />}
            />
            <Route
              path='/dashboard/chatbot'
              exact
              render={(props) => isAuthenticated ? <Chatbot {...props} /> : <Redirect to='/login' />}
            />
            <Route
              path='/dashboard/doctorchat'
              exact
              render={(props) => isAuthenticated ? <DoctorChat {...props} /> : <Redirect to='/login' />}
            />
            <Route
              path='/dashboard/covid'
              exact
              render={(props) => isAuthenticated ? <Covid {...props} /> : <Redirect to='/login' />}
            />
            <Route
              path='/login'
              exact
              render={(props) => !isAuthenticated ? <Login login={this.login} {...props} /> : <Redirect to='/dashboard' />}
            />
            <Route
              path='/signup'
              exact
              render={(props) => !isAuthenticated ? <Signup signup={this.signup} {...props} /> : <Redirect to='/dashboard' />}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
