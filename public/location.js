/*
  Geolocation API: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
*/

function updateCoords(pos, map, user){
  var coords = formatCoords(pos);
  user.setPosition(coords);
  map.setCenter(coords);
}

function updateUserCoords(pos, user){
  var coords = formatCoords(pos);
  user.setPosition(coords);
}

function formatCoords(pos){
  var coords = {lat: pos.coords.latitude,
                lng: pos.coords.longitude};
  return coords;
}

function getLocation(callback){
    geo =  navigator.geolocation;
    if(!geo){
      window.alert("We need your GPS location for an optimal experience");
    }else{
      return geo.getCurrentPosition(callback);
    }
}

function onLocationChange(callback){
  var geo = navigator.geolocation;
  if(geo){
    geo.watchPosition(callback);
  }else{
    window.alert("We need access to your GPS for correct functioning");
  }
}
