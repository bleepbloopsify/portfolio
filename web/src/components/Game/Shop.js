import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";

import { Query, Mutation } from 'react-apollo';

import { GET_STORE, PURCHASE_TOOL, GET_TOOLS } from '../queries';

const styles = theme => {
  return {
    root: {},
    shoproot: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 4,
    },
    shopItem: {
      
    }
  };
};

class Shop extends Component {
  render() {

    const { classes, onClose } = this.props;

    return (
      <Grid container spacing={8} className={classes.shoproot}>
        <Grid item xs={12}>
          <Typography variant="h1">SHOP</Typography>
          <Button variant="contained" onClick={onClose}>X</Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={8}>
          <Mutation mutation={PURCHASE_TOOL} 
            update={(cache, { data: { purchaseTool }})  => {
              const { tools } = cache.readQuery({ query: GET_TOOLS });

              cache.writeQuery({
                query: GET_TOOLS,
                data: { tools: [...tools, purchaseTool ]},
              });
            }}>
          {purchaseTool => 
            <Query query={GET_STORE}>
            {({ loading, error, data: { store }}) => {
              if (loading) return <CircularProgress color="primary" />;
              if (error) return `Error: ${error.message}`;

              return store.map((item, idx) => {
                return (
                  <Fragment key={idx}>
                    <Grid item xs={9} className={classes.shopItem} key={idx}>
                      <Typography variant="h3">{item.name}</Typography>
                      {item.costs.map(({ name, cost }, idx) => {
                        return (
                          <Typography variant="body1" key={idx}>{name} {cost}</Typography>
                        );
                      })}
                    </Grid>
                    <Grid item xs={3}>
                      <Button variant="contained" onClick={() => purchaseTool({ variables: { shop_idx: idx } })}>$$$</Button>
                    </Grid>
                  </Fragment>
                );
              });
            }}
            </Query>
          }
          </Mutation>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}


class ShopButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <Button onClick={() => this.setState({ open: true })} variant="contained">Shop</Button>
        <Modal open={open}
          aria-labelledby="Shop Modal"
          aria-describedby="Buy item bases here"
          onClose={() => this.setState({ open: false })}>
          <Shop classes={classes} onClose={() => this.setState({ open: false })} />
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(styles)(ShopButton);