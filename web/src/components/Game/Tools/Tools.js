import React, { Component, Fragment } from 'react';
import  { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button';
import { Query, Mutation } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

import { GET_TOOLS, MINE_ROCK, DELETE_TOOL, GET_ROCKS } from '../../queries';

import Tool from './Tool';

const styles = theme => {
  return {
    root: {
      flexGrow: 1,
    },
  };
}

class Tools extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container className={classes.root} spacing={24}>
          <Query query={GET_TOOLS}>
          {({ loading, error, data: { tools } = {}}) => {
            if (loading) return <CircularProgress />;
            if (error) return `Error ${error.message}`;
            return tools.map(tool =>
              <Tool key={tool.id} tool={tool} />
            );
          }}
        </Query>
      </Grid>
    );
  }
}


export default withStyles(styles)(Tools);