import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CSSBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AuthenticationWrapper from './AuthenticationWrapper';
import Game from './Game/Game';

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
          <AuthenticationWrapper>
            <Game />
          </AuthenticationWrapper>
        </div>
      </Fragment>
    )
  }
}

export default withStyles(styles)(App);