let BLACK = "#000000";
let BLUE = "#1A73E8";

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

function drawUserLocation(defaultCoords, map){
  var marker = new google.maps.Marker({
  position: defaultCoords,
  icon: {
    path: google.maps.SymbolPath.CIRCLE,
    strokeColor: BLUE,
    scale: 5
  },
  map: map,
  });
  return marker;
}

function genMap(){
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

  return map;
}

function initMap(){
  var parkList = {};
  var userMarker;

  map = genMap();
  userMarker = drawUserLocation(map.getCenter(), map);

  updateLocation(map, userMarker);
  centerMap(map, userMarker);

  requestData(parkList, map);

  window.setInterval(()=>{
    requestData(parkList, map);
  }, 1000);

  map.addListener('bounds_changed', () =>{
    requestData(parkList, map);
  });
}
