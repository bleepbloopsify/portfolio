import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';

import Modal from  './Modal';

const STATE_LOGIN = 'login';
const STATE_REGISTER = 'register';

const REGISTER_ACCOUNT = gql`
mutation {
  registerAccount
}
`;

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = async e => {
    e.preventDefault();

    console.log('Submitting');
    console.log(this.state);
  }

  onChange = key => async e => {
    this.setState({
      [key]: e.target.value,
    });
  }

  render() {
    const { email = '', password = '' } = this.state;

    return (
      <form className="form">
        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input 
            type="text"
            className="form-input" 
            name="email"
            value={email}
            onChange={this.onChange('email')}
            />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-input"
            name="password"
            value={password}
            onChange={this.onChange('password')} />
        </div>
      </form>
    );
  }
}

export default class Authenticate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      state: STATE_LOGIN,
    };
  }


  render() {
    const { open = false, state = STATE_LOGIN } = this.state;

    let body = null;

    switch (state) {
    case STATE_LOGIN:
      body = (
        <Login />
      );
      break;
    case STATE_REGISTER:
      body = (
        <div className="alert alert-info">
          <p>Register</p>
        </div>
      );
      break;
    default:
      body = (
        <div className="alert alert-danger">
          <p>
            There is an error with the authenticate body. Please refresh.
          </p>
        </div>
      );
    }

    return (
      <Modal>
        {body}
      </Modal>
    )
  }

}