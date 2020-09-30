// don't import 'firebase' - whole firebase library is huge
// just import firebase app only, that's all we need
import * as firebase from 'firebase/app';

// to interact with firestore database
import 'firebase/firestore';

// our web app's Firebase configuration
const config = {
  apiKey: "AIzaSyBXKSgaCSF-w7Uw_SLuLkHBcuT9l0tr1Xo",
  authDomain: "fir-basic-2e2b9.firebaseapp.com",
  databaseURL: "https://fir-basic-2e2b9.firebaseio.com",
  projectId: "fir-basic-2e2b9",
  storageBucket: "fir-basic-2e2b9.appspot.com",
  messagingSenderId: "543805712258",
  appId: "1:543805712258:web:ffc223d339b28b74fad19b",
  measurementId: "G-63QME5ZPHJ"
};

// creating instance of firebase application
firebase.initializeApp(config);

// accessing firebase services with our app 
const db = firebase.firestore();

// accessing data base collections with different methods & passing different options - {}
// .get() - to access all the documents inside a single collection using promise
// In the world of firebase, when you bring something back from the db, these are call - snapshots
// Snapshot is different kind of data information that we get from firebase
db.collection('cars').get().then( snapshot => {
  console.log(snapshot);
  // Within each snapshot, comes with default forEach() - not js function
  // forEach just works like regular forEach to access array of documents/objects in 
  // docs property of snapshot
  snapshot.forEach((doc) => {
    // document has a method call - data()
    // data method gives us human readable data but 
    // not id since it's not part of an object, however, there's methods for it
    console.log(doc.data())
  })
}).catch( error => {
  console.log(error)
});

export default firebase;