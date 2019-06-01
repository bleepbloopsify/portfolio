import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Rocks from './Rocks';
import Tools from './Tools';
import Shop from './Shop';


const styles = theme => {
  return {
    root: {},
  };
};

class Game extends Component {
  render() {

    return (
      <Grid container spacing={24}>
        <Grid item xs={6}>
          <Grid container spacing={8} direction="column">
            <Grid item xs={6}>
              <Typography variant="h1">All Mine</Typography>
              <Shop />
            </Grid>
            <Grid item xs={6}>
              <Tools />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Rocks />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Game);