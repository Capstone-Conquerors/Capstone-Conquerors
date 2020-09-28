let map;

let coordinates = {lat: 36.0686895, lng: -94.1748471};

let RED = "#FF0000";
let YELLOW = "#FFFF00";
let GREEN = "#00CC00";
let BLACK = "#000000";


function parkingColor(capacity, occupied){
  occupancy = (occupied)/capacity;
  if(occupancy >= 0.7) return RED;
  else if(occupancy >= 0.5 ) return YELLOW;
  else return GREEN;
}


function drawParkingLot(coordinates, capacity, occupated, map){
  var color = parkingColor(capacity, occupated);
  var parkingDraw = new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    center: coordinates,
    radius:
  });
  parkingDraw.setMap(map);
}

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 16
  });

  var parkingLotCoordinates = {lat: 36.075994, lng: -94.170265}

  drawParkingLot(parkingLotCoordinates, 10, 2, map);
}
