let BLACK = "#000000";
let BLUE = "#1A73E8";

function drawUserLocation(map){
  var marker = new google.maps.Marker({
  position: map.getCenter(),
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
  console.log("Map created");
  return map;
}

function initMap(){
  var parkList = {};
  var userMarker;

  map = genMap();
  userMarker = drawUserLocation(map);

  getLocation((pos) =>{updateCoords(pos, map, userMarker)});
  onLocationChange((pos) =>{updateUserCoords(pos, userMarker)});


  window.setInterval(()=>{
    requestData(parkList, map);
  }, 1000);

  map.addListener('bounds_changed', () =>{
    console.log("Updating map");
    requestData(parkList, map);
  });
}
