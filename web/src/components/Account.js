import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { GET_ACCOUNT } from './queries';

const styles = theme => {
  return {
    root: {

    },
  };
};

class Account extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={GET_ACCOUNT}>
      {({ loading, error, data: { me }}) => {
        if (loading) return <CircularProgress color="primary" />;

        return (
          <Grid>

          </Grid>
        )
      }}
      </Query>
    );
  }
}

export default withStyles(styles)(Account);