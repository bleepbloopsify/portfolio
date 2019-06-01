import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import { Mutation } from 'react-apollo';

const styles = theme => {
  return {
    root: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      width: '80%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 4,
    },
  };
}

class CraftingWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  onOpen = () => {
    this.setState({ open: true });
  }

  render() {
    const { children, classes, tool } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {children(this.onOpen)}
        <Modal open={open} onClose={() => this.setState({ open: false })}>
          <Grid container spacing={8} className={classes.root}>
            <Grid item xs={12}>
              <Typography variant="h1">Crafting Window</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              Item image and detais
            </Grid>
            <Grid item md={8}>
              Rock list
            </Grid>
          </Grid>
        </Modal>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CraftingWindow);
