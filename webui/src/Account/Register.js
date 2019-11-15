import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_ACCOUNT } from '../queries/account';
import { Link } from 'react-router-dom';

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

function RegisterForm(props) {
  const [register, { loading, error }] = useMutation(REGISTER_ACCOUNT);

  return (
    <Register register={register} loading={loading} error={error} {...props} />
  );
}

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      errors: [],
    };
  }

  addError = err => {
    const { errors } = this.state;
    this.setState({ errors: [...errors, err]});

    setTimeout(() => {
      // eslint-disable-next-line no-unused-vars
      const { errors: [_, ...errors]} = this.state;
      this.setState({ errors });
    }, 3000);
  };

  onSubmit = e => {
    e.preventDefault();

    const { register } = this.props;
    const { email, password, confirm_password } = this.state;

    if (password !== confirm_password) {
      this.addError("passwords do not match");
    } else {
      register({ variables: { email, password }})
        .then(() => this.setState({ email: '', password }))
        .catch(e => {
          console.log(e);
        });
    }
  }

  render() {
    const { classes, loading, error } = this.props;
    const { email, password, confirm_password, errors } = this.state;

    return (
      <div className={classes.root}>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={e => this.setState({ email: e.target.value })} disabled={loading} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={e => this.setState({ password: e.target.value })} disabled={loading} />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input type="password" value={confirm_password} onChange={e => this.setState({ confirm_password: e.target.value })} disabled={loading} />
          </div>
          <div>
            <button type="submit" disabled={loading}>Register</button>
          </div>
        </form>
        <p>Already have an account? Login <Link to="/account/login">here</Link></p>
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
        {errors.length > 0 &&
        <ul>
          {errors.map((err, idx) => 
            <li key={idx}>
              {err}
            </li>
          )}
        </ul>
        }
      </div>
    );
  }
}


export default withStyles(styles)(RegisterForm);



