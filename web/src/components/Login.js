import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { withApollo, Mutation } from 'react-apollo'

import { LOGIN_ACCOUNT } from './queries';

import { AUTH_TOKEN } from '../index';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      'flex-direction': 'column',
    },
  };
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = submitLogin => async e => {
    const { close, client } = this.props;

    e.preventDefault();

    const { data: { login } }  = await submitLogin({ variables: {...this.state}});

    localStorage.setItem(AUTH_TOKEN, login);

    await client.resetStore();
    close();
  }

  render() {
    const { classes } = this.props;
    const { email = '', password = '' } = this.state;

    return (
      <Mutation mutation={LOGIN_ACCOUNT}>
        {(login, { loading }) => {
          return <form className={classes.root} onSubmit={this.onSubmit(login)}>
            <Typography variant="h1">
              Login Form
            </Typography>
            <TextField 
              margin="normal"
              label={"Email"}
              value={email}
              InputProps={{
                readOnly: loading,
              }}
              onChange={e=>this.setState({ email: e.target.value })} />
            <TextField 
              label="Password"
              type="password"
              margin="normal" 
              value={password}
              InputProps={{
                readOnly: loading,
              }}
              onChange={e=>this.setState({ password: e.target.value })} />
            {loading ?
              <Button color="secondary" variant="contained"><CircularProgress /></Button>
              : <Button color="primary" variant="contained" type="submit">Login</Button>
            }
          </form>
        }
        }
      </Mutation>
    )
  }
}


export default withApollo(withStyles(styles)(Login));