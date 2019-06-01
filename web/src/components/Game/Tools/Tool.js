import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Mutation, Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { MINE_ROCK, DELETE_TOOL, GET_TOOLS, GET_ROCKS } from '../../queries';

import Crafting from '../Crafting';
import VerifyPrompt from '../VerifyPrompt';

const styles = theme => {
  return {
    root: {},
  };
};

class UseTool extends Component {
  render() {
    const { tool: { id: tool_id } = {}} = this.props;
    
    return (
      <Mutation mutation={MINE_ROCK} 
        update={(cache, { data: { mineRock }}) => {
          const { rocks } = cache.readQuery({ query: GET_ROCKS });

          cache.writeQuery({
            query: GET_ROCKS,
            data: { rocks: rocks.map(rock => {
              const found = mineRock.find(r => {
                return r.name == rock.name;
              });
              if (!found) return rock;
              return found;
            }) },
          });
        }}>
        {(mineRock, { loading }) => (
          <Button disabled={loading} variant="contained" color="primary" onClick={() => mineRock({ variables: { tool_id }})}>
            {loading ? <CircularProgress color="secondary" />
              : <FontAwesomeIcon icon={faArrowDown} />
            }
          </Button>
        )}
      </Mutation>
    );
  }
}

class DeleteTool extends Component {
  render() {
    const { tool: { id: tool_id } = {}} = this.props;

    return (
      <Mutation mutation={DELETE_TOOL}
        update={(cache, { data: { deleteTool }}) => {
          const { tools } = cache.readQuery({ query: GET_TOOLS });
          cache.writeQuery({
            query: GET_TOOLS,
            data: { tools: tools.filter(tool => tool.id != deleteTool.id)},
          });
        }}>
        {deleteTool => (
          <VerifyPrompt onVerify={() => deleteTool({ variables: { tool_id }})}>
            {onOpen => (
              <Button variant="contained" onClick={onOpen}><FontAwesomeIcon icon={faTrash} /></Button>
            )}
          </VerifyPrompt>
        )}
      </Mutation>
    )
  }
}

class Tool extends Component {
  render() {
    const { classes, tool } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={8}>
          <Typography color="textSecondary">
            {tool.name}
          </Typography>
          <Typography>
            Power: {tool.power}
          </Typography>
          <Typography>
            Modifiers:
          </Typography>
          <Grid container spacing={8} direction="column">
            {tool.modifiers.map((mod, idx) =>
              <Grid item xs={12} key={idx}>
                <Typography variant="body2">
                  {mod.text}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={0} direction="column" alignItems="flex-end">
            <Grid item>
              <UseTool tool={tool} />
            </Grid>
            <Grid item>
              <DeleteTool tool={tool} />
            </Grid>
            <Grid item>
              <Crafting tool={tool}>
                {onOpen => (
                  <Button variant="outlined" color="secondary" onClick={onOpen}>
                    Crafting
                  </Button>
                )}
              </Crafting>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Tool);