import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Query } from 'react-apollo';
import Typography from '@material-ui/core/Typography';

import { GET_ROCKS } from '../../queries';
import Rock from '../Rock';

const styles = theme => ({
  root: {

  },
});

class Currency extends Component {
  
  render() {
    return (
      <Grid container direction="column">
        <Query query={GET_ROCKS}>
          {({ loading, error, data: { rocks } = {}}) => 
            <Fragment>
              {rocks.map(rock =>
                <Grid item key={rock.id}>
                  <Rock {...rock}>
                    <Typography>
                      {rock.name}
                    </Typography>
                    <Typography>
                      {rock.count}
                    </Typography>
                  </Rock>
                </Grid>
              )}
            </Fragment>
          }
        </Query>
      </Grid>
    );
  }
}


export default withStyles(styles)(Currency);