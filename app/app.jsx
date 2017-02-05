import React from 'react';
import ReactDOM from 'react-dom';

import Test from './components/test.js';
import './styles/app.scss';

ReactDOM.render(
 <Test count={88}/>,
  document.getElementById('app')
);
