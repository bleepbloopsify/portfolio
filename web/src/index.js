import React, { Component } from 'react';
import { render } from 'react-dom';

import { getSuccess } from './api';

import ResponsiveButton from './components/ResponsiveButton';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Hello There</h1>
            <ResponsiveButton onClick={getSuccess}>Hit API</ResponsiveButton>
          </div>
        </div>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('app')
);