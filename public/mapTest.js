function requestData(parkList, map){
  var bounds = map.getBounds();
  var coords = {sw: bounds.sw, ne: bounds.ne};
  $.ajax({
    url: "getParkingLot",
    method: "GET",
    data: coords,
    dataType: "json",
    success: (response) =>{
      updateParkingLots(response, parkList);
    }
  });
}

function updateParkingLots(response, parkList){
  console.log(response);
  for(const id in response){
    var newLot = response[id];
    var key = `${newLot.coordinates.lat}-${newLot.coordinates.lng}`;
    if(parkList[key] == null) parkList[key] = new parkingLot(newLot, map);
    else{
      parkList[key].update(newLot);
    }
  }
}
