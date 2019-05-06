import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { MINE_ROCK, GET_ROCKS } from './queries';

const styles = theme => {
  return {

  };
}

class Clicker extends Component {
  mineRock = e => {
    e.preventDefault();

    const { count } = this.state;

    this.setState({ count: count + 1 });
  }

  render() {
    const { classes = {} } = this.props;

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item>
          <Mutation mutation={MINE_ROCK}
            update={(cache, { data: { mineRock }}) => {
              const { rocks } = cache.readQuery({ query: GET_ROCKS });

              cache.writeQuery({
                query: GET_ROCKS,
                data: { rocks: [...rocks, mineRock ]},
              });
            }}>
            {mineRock => 
              <Button color="primary" variant="contained" onClick={mineRock}>Mine Rock</Button>
            }
          </Mutation>
        </Grid>
        <Grid item>
          <Query query={GET_ROCKS}>
            {({ loading, error, data: { rocks } = {}}) => {
              if (loading) return <FontAwesomeIcon icon={faSpinner} spin />;
              if (error) return `Error ${error.message}`;

              const value = rocks.reduce((value, rock) => value + rock.value, 0);

              return <Typography variant="h3">{value}</Typography>
            }}
          </Query>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Clicker);