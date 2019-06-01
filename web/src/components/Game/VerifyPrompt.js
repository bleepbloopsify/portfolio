import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


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
};

class VerifyPrompt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  onOpen = e => {
    e.preventDefault();
    this.setState({ open: true });
  }

  render() {
    const { onVerify, children, classes } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        {children(this.onOpen)}
        <Modal open={open}
          onClose={() => this.setState({ open: false })}
        >
          <DialogContent className={classes.root}>
            <Grid container spacing={16}>
              <Grid item xs={12}>
                <Typography variant="h1">Are you sure?</Typography>
              </Grid>
              <Grid item xs={6}>
                <Button variant="contained" color="primary" onClick={onVerify}>Yes</Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant="outlined" color="primary" onClick={() => this.setState({ open: false })}>Never Mind</Button>
              </Grid>
            </Grid>

          </DialogContent>
        </Modal>
      </Fragment>
    )
  }
}

export default withStyles(styles)(VerifyPrompt);