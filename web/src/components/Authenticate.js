import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Login from './Login';

const STATE_LOGIN = 'login';
const STATE_REGISTER = 'register';

const styles = theme => {
  return {
    root: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 4,
    },
  };
};


class Authenticate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      state: STATE_LOGIN,
    };
  }


  render() {
    const { classes } = this.props;
    const { open = false, state = STATE_LOGIN } = this.state;

    let body = null;

    switch (state) {
    case STATE_LOGIN:
      body = (
        <Login close={() => this.setState({ open: false })} />
      );
      break;
    case STATE_REGISTER:
      body = (
        <div className="alert alert-info">
          <p>Register</p>
        </div>
      );
      break;
    default:
      body = (
        <div className="alert alert-danger">
          <p>
            There is an error with the authenticate body. Please refresh.
          </p>
        </div>
      );
    }

    return (
      <Fragment>
        <Button color="primary" variant="contained" onClick={() => this.setState({ open: true })}>Authenticate</Button>
        <Modal
          aria-labelledby="Authentication Modal"
          aria-describedby="Login/Register here"
          open={open}
          onClose={() => this.setState({ open: false })}
          >
          <div className={classes.root}>
            {body}
          </div>
        </Modal>
      </Fragment>
    )
  }
}

export default withStyles(styles)(Authenticate);