import * as atatus from 'atatus-spa';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

atatus.config('39b3d30f45ee4306b18256490d89011c').install();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();
reportWebVitals();
