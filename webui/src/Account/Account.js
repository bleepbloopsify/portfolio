import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const styles = theme => ({
  root: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'center',
    width: '100vw',
    'min-height': '100vh',
  },
});

class Account extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Route path="/account/login"><Login /></Route>
        <Route path="/account/signup"><Register /></Route>
      </div>
    );
  }
}


export default withStyles(styles)(Account);