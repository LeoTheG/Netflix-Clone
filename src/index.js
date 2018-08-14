import React from 'react';
import ReactDOM from 'react-dom';

import '../src/styles/app.css';
import '../src/styles/appStyles.scss';

ReactDOM.render(
  <h1>Hey Man</h1>,
  document.getElementById('app'),
);
if (module.hot) {
  module.hot.accept();
}