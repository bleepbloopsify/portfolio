import React, { Component } from 'react';

export default class AccountCard extends Component {
  render() {
    const { username, email } = this.props;

    return (
      <div className="card m-3">
        <div className="card-body">
          <div className="card-title">
            {username}
          </div>
          Email: {email}
        </div>
      </div>
    );
  }
}