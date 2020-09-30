import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

// need to run firebase in the beginning of our application
import firebase from './api/firebase';

ReactDOM.render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>,
  document.getElementById('root')
);

