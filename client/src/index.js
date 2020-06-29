
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import * as serviceWorker from './serviceWorker';


const rootEl = document.getElementById('root')

ReactDOM.render(
  <Login />,
  // <App />,
  rootEl
)

// if (module.hot) {
//   module.hot.accept('./App', () => {
//     const NextApp = require('./App').default
//     ReactDOM.render(
//       <NextApp />,
//       rootEl
//     )
//   })
// }
if (module.hot) {
  module.hot.accept('./Login', () => {
    const NextApp = require('./Login').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}