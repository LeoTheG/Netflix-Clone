import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(
  <h1>Hey Man</h1>,
  document.getElementById('app'),
);
if (module.hot) {
  module.hot.accept();
}