
function centerMap(map, user){
  var coords = user.getPosition();
  coords = {lat: coords.lat(), lng: coords.lng()};
  map.setCenter(coords);
}

function updateLocation(map, user){
  var geo = navigator.geolocation;
  if(geo){
    geo.watchPosition((pos) =>{
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      user.setPosition(coords);
    });
  }else{
    window.alert("We need access to your GPS for correct functioning");
  }
}

function initMap(){
  var defaultCoords = {lat: 36.0686895, lng: -94.1748471};
  const noPOI = [{
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off"}]
  }];
  var map = new google.maps.Map(document.getElementById("map"), {
    center: defaultCoords,
    zoom: 16,
    clickableIcons: false,
    styles: noPOI
  });
  var userMarker = drawUserLocation(defaultCoords, map);
  updateLocation(map, userMarker);
  centerMap(map, userMarker);
  initTestData(drawParkingLot, addInfo, map);
}
