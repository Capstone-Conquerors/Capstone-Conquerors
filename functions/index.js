
const servAccount = require("./serviceAccount.json");
const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp({
	credentials: admin.credential.cert(servAccount),
	databaseURL: "https://parkinglotcapstone.firebaseio.com"
});

var db = admin.database();
var parkingLot = db.ref("parkingLot");

//Reference for functions used can be found in:
//https://firebase.google.com/docs/reference/js/firebase.database.Query

exports.getParkingLot = functions.https.onRequest((request, response) =>{
	console.log("Function executing");
	var nw = request.query.nw;
	var se = request.query.se;
	console.log(`Requested Data:\n${nw}\n${se}`)
	parkingLot.orderByChild("coordinates/lat").once("value").then(function(snapshot){
		console.log("Request made");
		if(snapshot.exists()){
			console.log("snapshot exists!!");
			response.json(snapshot.toJSON());
			response.status(200).send();
		} else {
			console.log("No data found!");
			response.status(404).send();
		}
	}, function(error){
		console.log("Failed " + error.code);
	}
	)
})
