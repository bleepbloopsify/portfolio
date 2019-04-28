import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const UNPRESSED = 'unpressed';
const LOADING = 'loading';
const FINISHED = 'finished';

export default class ResponsiveButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: UNPRESSED,
    };
  }

  onClick = async e => {
    e.preventDefault();

    const { onClick = null, delay = 1000 } = this.props;

    await this.setState({
      state: LOADING,
    })

    if (onClick === null) return;
    else await onClick();

    await this.setState({
      state: FINISHED,
    });

    setTimeout(() => {
      this.setState({
        state: UNPRESSED,
      });
    }, delay);
  }

  render() {
    const { children } = this.props;
    const { state } = this.state;

    const componentClasses = ["responsive__button", "btn"];
    const componentProperties = {};
    let componentContent = null;

    switch(state) {
    case UNPRESSED:
      componentClasses.push("btn-primary");
      componentContent = children;
      break;
    case LOADING:
      componentClasses.push("btn-secondary");
      componentProperties['disabled'] = true;
      componentProperties['aria-disabled'] = true;
      componentContent = <FontAwesomeIcon icon={faSpinner} spin />;
      break;
    case FINISHED:
      componentClasses.push("btn-success");
      componentContent = "Finished!";
      break;
    }

    return (
      <button 
        onClick={this.onClick}
        className={componentClasses.join(" ")} 
        {...componentProperties}>
        {componentContent}
      </button> 
    );
  }
}