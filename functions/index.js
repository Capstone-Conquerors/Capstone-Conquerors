
const servAccount = require("./serviceAccount.json");
const functions = require('firebase-functions');
const admin = require("firebase-admin");

admin.initializeApp({
	credentials: admin.credential.cert(servAccount),
	databaseURL: "https://parkinglotcapstone.firebaseio.com"
});

var db = admin.database();
var parkingLot = db.ref("parkingLot");
var sensors = db.ref("Sensors");
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
			filteredData = lngFilter(snapshot, parseFloat(coords.west), parseFloat(coords.east));
			console.log(filteredData);
			response.json(filteredData);
			response.status(200).send();
		}else{
			console.log("Data not found");
			response.status(404).send();
		}
	});
});

exports.updateParkingData = functions.https.onRequest((request, response) =>{
	/*
	sensInfo = JSON.parse(request.rawBody);
	*/
	sensInfo = {
		id: "0-0",
		status: true
	}
	ids =  sensInfo.id.split("-");
	updateSpot(ids[0], ids[1], sensInfo.status);
	updateAvailableCount(ids[0]);
	response.status(200).send();
});


/***********************************************************************
updateAvailableCount(parkId)
	parkingId: Key of parking spot where sensor is located
	sensorId: Unique ID of sensor for the given parking Spot
	status: availabilitu of parking spot
	Updates whether a parkign spot is available or not.
************************************************************************/
function updateSpot(parkingId, sensorId, status){
	console.log("Updating Spot");
	var entryPath = `${parkingId}/${sensorId}`
	var update = {};
	update[entryPath] = status;
	sensors.update(update);
}

/***********************************************************************
updateAvailableCount(parkId)
	parkId: Key of park whose availability count  has to be updated
	Updates availability count by counting how many sensor that belong to
	the parking lot are available
************************************************************************/
function updateAvailableCount(parkId){
	console.log("Updating available");
	var path = `${parkId}/available`;
	var newData = {};
	var availableCount = 0;
	sensors.child(parkId).on("value", function(snapshot){
		if(snapshot.exists()){
			console.log(snapshot.val());
			snapshot.forEach((sensor, i) => {
				var available = sensor.val();
				if(available == true)
				 	availableCount += 1;
			});
		}
	});
	console.log(`New available Count: ${availableCount}`);
	newData[path] = availableCount;
	parkingLot.update(newData);
}

/***********************************************************************
lngFilter(snapshot, sLng, nLng)
	sLng: float value representing the south lng coordindates
	nLng: float value representing the nourth lng coordindates
	snapshot: dataSnapshot object that contains parking lot entries
	returns json object with parking lot entries between the sLng and nLng
					boundaries. Entries returned do not contain parkingLot id
************************************************************************/
function lngFilter(snapshot, wLng, eLng){
	var lngFilteredData  = [];
	snapshot.forEach((parkingLot) => {
		var pLData = parkingLot.val()
		if (pLData.coordinates.lng >= wLng && pLData.coordinates.lng <= eLng){
			lngFilteredData.push(pLData);
		}
	});
	return JSON.stringify(lngFilteredData);
}
