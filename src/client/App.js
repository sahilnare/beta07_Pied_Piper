import React, { Component } from 'react';
import './app.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Chatbot from './pages/features/Chatbot';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      message: null,
      isAuthenticated: false,
      username: null
    }
  }

  componentDidMount() {
    fetch('/api/getMessage')
      .then(res => res.json())
      .then(res => this.setState({ message: res.message }));
  }

  login = (cred) => {
    this.setState({username: cred.username, isAuthenticated: true});
  }

  signup = (cred) => {
    this.setState({username: cred.username, isAuthenticated: true});
  }

  logout = () => {
    this.setState({username: null, isAuthenticated: false});
  }

  render() {
    const { message, isAuthenticated, username } = this.state;
    console.log(username);
    return (
      <div className="App">
        <BrowserRouter>
          <Navbar logout={this.logout} />
          <Switch>
            <Route
              path='/'
              exact={true}
              render={(props) => !isAuthenticated ? <Home message={message} {...props} /> : <Redirect to='/dashboard' />}
            />
            <Route
              path='/dashboard'
              exact={true}
              render={(props) => isAuthenticated ? <Dashboard {...props} /> : <Redirect to='/login' />}
            />
            <Route
              path='/login'
              exact={true}
              render={(props) => !isAuthenticated ? <Login login={this.login} {...props} /> : <Redirect to='/dashboard' />}
            />
            <Route
              path='/signup'
              exact={true}
              render={(props) => !isAuthenticated ? <Signup signup={this.signup} {...props} /> : <Redirect to='/dashboard' />}
            />
            <Route
              path='/dashboard/chatbot'
              exact={true}
              render={(props) => isAuthenticated ? <Chatbot {...props} /> : <Redirect to='/login' />}
            />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
