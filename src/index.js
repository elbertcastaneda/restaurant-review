import React from 'react';

import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import GlobalStyle from './components/GlobalStyle.styled';
import App from './containers/App';

ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  document.getElementById('app-render')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. More documentation.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
