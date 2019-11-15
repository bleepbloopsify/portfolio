import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import ApolloClient from 'apollo-client';

import Account from './Account';

const link = new HttpLink({
  uri: `${process.env.REACT_APP_APIHOST}/graphql`,
  fetchOptions: {
    credentials: 'include',
  },
});

const client = new ApolloClient({ 
  link, cache: new InMemoryCache(), 
  credentials: 'include',
});

function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          All Mine
        </Route>
        <Route path="/account"><Account /></Route>
      </Switch>
    </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
