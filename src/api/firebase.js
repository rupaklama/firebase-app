// don't import 'firebase' - whole firebase library is huge
// just import firebase app only, that's all we need
import * as firebase from 'firebase/app';

// to interact with firestore database
import 'firebase/firestore';

// need to import auth library from firebase for authentication
import 'firebase/auth';

// to interact with database
import 'firebase/database';

// firebase storage
import 'firebase/storage';

// cloud functions
import 'firebase/functions'

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

// initialize our firebase application
firebase.initializeApp(config);

// accessing firebase firestore database service with our app 
const db = firebase.firestore();

// accessing firebase auth  
firebase.auth();

// cloud function instance
export const functions = firebase.functions();

// firebase storage
export const storage = firebase.storage();
// references - on storage we use ref
export const storageRef = storage.ref();
// reference to store images
export const usersRef = storageRef.child('/images/users/');

// server timestamp
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;

// Making References to access Collections in firestore
// References create individual reference to Collections & good design pattern

// instead of accessing db like this - db.collection('cars') in below
// alternative approach is to use - References
// Reference to access Collection - documents id
export const carsCollection = db.collection('cars'); // reference to cars collection

// user collection
export const usersCollection = db.collection('users');

// Reference to access Document - objects id
// export const siteRef = db.doc('site/business'); // collection/document

// Reference to access sub-collections - nested collection 'admins'
export const employeeRef = db.collection('site').doc('employees').collection('admins');

// accessing data base collections with different methods & passing different options - {}
// .get() - to access particular document inside a single collection using promise
// In the world of firebase, when you bring something back from the db, these are call - snapshots
// Snapshot is different kind of data information for a particular document that we get from firebase 
// db.collection('cars').get().then( snapshot => {
//   console.log(snapshot);
//   // Within each snapshot, comes with default forEach() - not js function
//   // forEach just works like regular forEach to access array of data/objects in 
//   // docs property of snapshot
//   snapshot.forEach((doc) => {
//     // document has a method call - data()
//     // data method gives us human readable data but 
//     // not id since it's not part of an object, however, there's methods for it
//     console.log(doc.data())
//   })
// }).catch( error => {
//   console.log(error)
// });

export default firebase;