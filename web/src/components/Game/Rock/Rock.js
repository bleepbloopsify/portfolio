import React, { Component } from 'react';

/**
 * This is just a wrapper component for functionality. Anything inside this will have Rock functionality
 */

class Rock extends Component {

  onClick = e => {
    e.preventDefault();
    // TODO: probably pick this up or something similar

    const { id, name, count } = this.props;

    console.log(`Rock ${id}:${name} with count ${count} clicked`);
  } 

  onContextMenu = e => {
    e.preventDefault(); // This will prevent an actual right-click menu from opening

    // TODO: definitely pick this up in preparation for applying this
    const { id, name, count } = this.props;

    console.log(`Rock ${id}:${name} with count ${count} right-clicked`);
  }

  onMouseOver = e => {
    e.preventDefault();

    // TODO: probably show a tooltip or something
    const { id, name, count } = this.props;

    console.log(`Rock ${id}:${name} with count ${count} hovered`);
  }

  render() {
    
    const { children } = this.props;

    return (
      <div 
        onClick={this.onClick} 
        onContextMenu={this.onContextMenu}
        onMouseOver={this.onMouseOver}>
        {children}
      </div>
    );
  }
}

export default Rock;