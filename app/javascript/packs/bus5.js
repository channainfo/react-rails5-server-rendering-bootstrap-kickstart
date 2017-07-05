import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

import 'bootstrap/dist/css/bootstrap';
import 'bootstrap/dist/css/bootstrap-theme';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />, document.body.appendChild(document.createElement('div')),
  )
})
