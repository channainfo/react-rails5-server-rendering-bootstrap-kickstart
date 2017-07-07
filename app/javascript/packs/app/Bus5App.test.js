import React from 'react';
import ReactDOM from 'react-dom';
import Bus5App from './Bus5App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bus5App />, div);
});
