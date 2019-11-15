
import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';

import  { LOGIN_ACCOUNT } from '../queries/account';

function LoginForm(props) {
  const [login, { loading, error }] = useMutation(LOGIN_ACCOUNT);

  return (
    <Login login={login} loading={loading} error={error} {...props} />
  );

}

const styles = theme => ({
  root: {
    '& > h1': {
      'text-align': 'center',
    },
  },
  form: {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'left',
    '& > div': {
      margin: '0.5em',
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'flex-end',
      'justify-content': 'flex-end',
      '& > label': {
        'margin-right': '0.5em',
      },
    },
  }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;

    login({ variables: { email, password }})
      .then(() => this.setState({ email: '', password: '' }))
      .catch(e => {
        console.log(e);
      })
  }

  render() {
    const { classes, loading, error } = this.props;
    const { email, password } = this.state;

    return(
      <div className={classes.root}>
        <h1>Login</h1>

        <form onSubmit={this.onSubmit} className={classes.form}>
          <div>
            <label>Email</label>
            <input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} disabled={loading} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} disabled={loading}/>
          </div>
          <div>
            <button type="submit" disabled={loading}>Login</button>
          </div>
        </form>

        <p>Don't have an account? Sign up <Link to="/account/signup">here</Link></p>
        {error && 
          <ul>
            {error.graphQLErrors.map(({message}, idx) =>
              <li key={idx}>
                {message}
              </li>
            )
            }
          </ul>
        }
      </div>
    );
  }
}


export default withStyles(styles)(LoginForm);