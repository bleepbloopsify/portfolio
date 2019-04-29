import React, { Component } from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { getSuccess } from './api';

import ResponsiveButton from './components/ResponsiveButton';
import AccountList from './components/AccountList';

import './styles.scss';

const client = new ApolloClient({
  uri: APIHOST + '/graphql',
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9">
            <h1>Hello There</h1>
            <ResponsiveButton onClick={getSuccess}>Hit API</ResponsiveButton>
          </div>
          <div className="col-md-3">
            <AccountList />
          </div>
        </div>
      </div>
    );
  }
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);