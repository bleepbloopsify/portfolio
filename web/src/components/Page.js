import React, { Component } from 'react';


export default class Page extends Component {
  render() {
    const { children } = this.props;
    
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            {children}
          </div>
        </div>
      </div>
    );
  }
}