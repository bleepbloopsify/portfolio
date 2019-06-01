import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { GET_ROCKS } from '../queries';

const styles = theme => ({

});

class Rocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes = {} } = this.props;

    return (
      <Grid container spacing={8} className={classes.root} direction="column">
        <Query query={GET_ROCKS}>
        {({ loading, error, data: { rocks } = {}}) => {
          if (loading) return <FontAwesomeIcon icon={faSpinner} spin />;
          if (error) return `Error ${error.message}`;

          return rocks.sort((a, b) => b.count - a.count).map(rock =>
            <Grid item key={rock.name}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary">
                    {rock.name}
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        Image
                      </Typography>
                      <Typography>
                        Count: {rock.count}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          );
        }}
        </Query>
      </Grid>
    );
  }
}

export default withStyles(styles)(Rocks);