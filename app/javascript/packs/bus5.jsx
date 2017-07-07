import React from 'react';
import ReactDOM from 'react-dom';
import Bus5App from './app/Bus5App';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Bus5App />, document.body.appendChild(document.createElement('div')),
  )
})
