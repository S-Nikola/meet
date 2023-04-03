import React from 'react';
import { render } from 'react-dom'
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import * as atatus from 'atatus-spa';
atatus.config('2b13a83a6fcc4920913038be3b73686e').install();

const root = document.getElementById('root');
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    root
  );
  
serviceWorkerRegistration.register();

reportWebVitals();
