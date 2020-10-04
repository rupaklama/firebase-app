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

// Adds an observer for changes to the user's sign-in state
// this Subscription (user state) will run when browser runs for the first time
firebase.auth().onAuthStateChanged( user => {
  if(user) {
    console.log(user.email)
    console.log(user.uid)
  } else {
    console.log('no user')
  }
})
