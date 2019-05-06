import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Clicker from './Clicker';
import Rocks from './Rocks';

const styles = theme => {
  return {
    root: {
      padding: theme.spacing.unit,
    }, 
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: null,
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <CSSBaseline />
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Typography variant="h1">Rocks</Typography>
              <Clicker />
            </Grid>
            <Grid item xs={6}><Rocks /></Grid>
          </Grid>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(App);