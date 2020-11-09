
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
	var coords = request.query;
	//Limited by a single order by call
	//parkingLot.orderByChild("coordinates/lng").startAt(parseFloat(coords.west)).endAt(parseFloat(coords.east));
	parkingLot.orderByChild("coordinates/lat").startAt(parseFloat(coords.south)).endAt(parseFloat(coords.north)).on("value", function(snapshot){
		console.log(`Lng: [${coords.west}, ${coords.east}]`)
		console.log(`Lat: [${coords.south}, ${coords.north}]`)

		if(snapshot.exists()){
			response.json(snapshot.toJSON());
			response.status(200).send();
		}else{
			console.log("Data not found");
			response.status(404).send();
		}
	});
})
