import * as atatus from 'atatus-spa';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react/jsx-dev-runtime.js';

import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import * as serviceWorkerRegistration from './serviceWorkerRegistration.js';
import './styles/index.css';

atatus.config('39b3d30f45ee4306b18256490d89011c').install();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
