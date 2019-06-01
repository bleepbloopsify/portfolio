import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GET_ACCOUNT } from './queries';
import Authenticate from './Authenticate';


const styles = theme => {
  return {
    root: {},
  };
};


class AuthenticationWrapper extends Component {
  render() {
    const { children } = this.props;

    return (
      <Query query={GET_ACCOUNT}>
      {({ loading, error, data}) => {
        if (loading) return <CircularProgress />
        if (error) {
          if (error.graphQLErrors[0].extensions.code == 'UNAUTHENTICATED') {
            return <Authenticate />;
          } else {
            console.log(JSON.stringify(error));
  
            return `Error ${error.message}`;
          }
        }

        return children;
      }}
      </Query>
    );
  }
}


export default withStyles(styles)(AuthenticationWrapper);