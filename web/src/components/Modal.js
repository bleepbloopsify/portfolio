import React, { Component, Fragment } from 'react';
import { createPortal } from 'react-dom';

import './Modal.scss';

const ModalRoot = document.body;

const ModalTrigger = ({ onClick }) => {
  return (
    <button 
      className="btn btn-primary" 
      onClick={onClick}>
      Open Modal
    </button>
  );
}

const ModalContent = (props) => {
  const { children, onClose } = props;

  return createPortal(
    <aside className="c-modal-cover">
      <div className="c-modal">
        <button className="c-modal__close" onClick={onClose}>
          <span className="u-hide-visually">Close</span>
          <svg className="c-modal__close-icon" viewBox="0 0 40 40"><path d="M 10,10 L 30,30 M 30,10 L 10,30"></path></svg>
        </button>
        <div className="c-modal__body">
          {children}
        </div>
      </div>
    </aside>,
    ModalRoot
  );
}

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  render() {
    const { children } = this.props;
    const { open } = this.state;

    return (
      <Fragment>
        <ModalTrigger onClick={() => {
          this.setState({ open: true });
        }}/>
        {open &&
          <ModalContent onClose={() => {
            this.setState({ open: false });
            }}>
            {children}
          </ModalContent>
        }
      </Fragment>
    );
  }
}