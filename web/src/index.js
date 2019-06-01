import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { HttpLink } from 'apollo-link-http';
import purple from '@material-ui/core/colors/purple';

import App from './components/App';

export const AUTH_TOKEN = 'auth-token';

const link = new HttpLink({
  uri: APIHOST + '/graphql',
  fetch: (uri, options) => {
    options.headers.authorization = `Bearer ${localStorage.getItem(AUTH_TOKEN)}`;
    return fetch(uri, options);
  }
});

const client = new ApolloClient({ link, cache: new InMemoryCache() });


const theme = createMuiTheme({
  palette: {
    primary: { main: purple[500] }, // Purple and green play nicely together.
    secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  },
  typography: { useNextVariants: true },
});

render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('app')
);