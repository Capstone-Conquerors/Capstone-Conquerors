let map;

let coordinates = {lat: 36.0686895, lng: -94.1748471};

let RED = "#FF0000";
let YELLOW = "#FFFF00";
let GREEN = "#00CC00";
let BLACK = "#000000";

const infoFormat = `<div>
                    <h1>{title}</h1>
                    <p>Capacity: {capacity}</p>
                    <p>Available: {available}</p>
                  </div>`;

function parkingColor(capacity, occupied){
  occupancy = (occupied)/capacity;
  if(occupancy >= 0.7) return RED;
  else if(occupancy >= 0.5 ) return YELLOW;
  else return GREEN;
}


function drawParkingLot(coordinates, capacity, occupated, size, map){
  var color = parkingColor(capacity, occupated);
  var parkingDraw = new google.maps.Circle({
    strokeColor: color,
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35,
    center: coordinates,
    radius: size
  });
  parkingDraw.setMap(map);
  return parkingDraw;
}
var counter = 0;
function addInfo(pLotArea, info){
  var infoStr = infoFormat.toString();

  for(const entry in info){
    infoStr = infoStr.replace(`{${entry}}`, info[entry]);
  }
  var infoWindow = new google.maps.InfoWindow({
    content: infoStr,
    position: pLotArea.center
  });

  google.maps.event.addListener(pLotArea, 'click', function(){
    infoWindow.open(pLotArea.map);
  });
}

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 16
  });

  initTestData(drawParkingLot, addInfo, map);
}
