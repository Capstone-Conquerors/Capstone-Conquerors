let map;

let coordinates = {lat: 36.0686895, lng: -94.1748471};

function initMap(){
  map = new google.maps.Map(document.getElementById("map"), {
    center: coordinates,
    zoom: 16
  });
}
