import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { GET_ROCKS } from './queries';

const styles = theme => ({

});

class Rocks extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes = {} } = this.props;

    return (
      <Grid container spacing={16} className={classes.root}>
        <Grid item xs={9}>
          <Query query={GET_ROCKS}>
          {({ loading, error, data: { rocks } = {}}) => {
            if (loading) return <FontAwesomeIcon icon={faSpinner} spin />;
            if (error) return `Error ${error.message}`;

            const types = rocks.reduce( (types, rock) => {
              if (rock.name in types) {
                types[rock.name].count += 1;
              } else {
                types[rock.name] = {
                  name: rock.name,
                  count: 1,
                  value: rock.value
                };
              }
              return types;
            }, {});

            return Object.values(types).map(type =>
              <Card key={type.name}>
                <CardContent>
                  <Typography color="textSecondary">
                    {type.name}
                  </Typography>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography color="textPrimary">
                        Total Value:{type.value * type.count}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        Value: {type.value}
                      </Typography>
                      <Typography>
                        Count: {type.count}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            );
          }}
          </Query>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Rocks);