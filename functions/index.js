const functions = require('firebase-functions');
const admin = require('firebase-admin');

// connecting to our firebase project
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Cloud functions are build on EXPRESS/NODE
// three ways of using cloud functions
// three types of cloud functions - http, trigger & callables 

// to make cloud function to work, we need to export it
// making reference to the firebase-functions object & its property & method
// onRequest method means we are doing something with function to this route
// whenever we have new request on this route, we just run callback func

// these ones are HTTP type functions
// exports.someRoute = functions.https.onRequest((req, res) => {
//   res.send('Hello its working')
// }) 

// accessing firestore db to store this data
// name of the function is contacts
exports.contacts = functions.https.onRequest(async (req, res) => {
  const name = req.query.name;
  const phone = req.query.phone;

  // create new collection with admin module
  const addContact = await admin.firestore().collection('contact').add({
    name: name,
    phone: phone
  })

  res.json({ result: `${addContact.id}`})
}) 

// TRIGGERS functions
// this will get trigger when something happens
// General usage is let's say every time we add new user or new field in contact collection,
// we want to trigger a function
// name of the function is addData 
// contact/{contactId} - every time this gets created, do something
exports.addDate = functions.firestore.document('contact/{contactId}')
  .onCreate((snapshot, context) => {
    // add a timestamp
    const timestamp = admin.firestore.FieldValue.serverTimestamp();
    return admin.firestore().doc(`contact/${context.params.contactId}`)
      .update({
        dateAdded: timestamp
      })
})

// Callables functions
exports.addLog = functions.https.onCall((data, context) => {
  return 'log added';
})


// to use above function, we need to deploy it 
// you can deploy whole project or just the functions with
// firebase deploy --only functions

// NOTE: The ClOUD functions works best in mobile applications,
// so the users when they install app in their phone, they will not install 
// cloud functions files - this is just for us, they will install everything else
// So, we update cloud functions, that will update our server that 
// way we don't need to update our application & users don't either
