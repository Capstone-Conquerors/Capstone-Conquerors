const functions = require('firebase-functions');


exports.resp = functions.https.onRequest((request, response) =>{
	response.send("Im working");
})

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
