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
  var map = new google.maps.Map(document.getElementById("map"), {
    center: defaultCoords,
    zoom: 16,
    clickableIcons: false,
    mapId: "614d50da4f0aad73",
    disableDefaultUI: true
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
  }, 750);

  /*
  Updates map everytime coordisnates change
  Unnecessary
  map.addListener('bounds_changed', () =>{
    console.log("Updating map");
    requestData(parkList, map);
  });
  */
}
