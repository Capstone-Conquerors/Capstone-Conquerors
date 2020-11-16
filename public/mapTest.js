function requestData(parkList, map){
  var bounds = map.getBounds();
  var coords = {sw: bounds.sw, ne: bounds.ne};
  $.ajax({
    url: "getParkingLot",
    method: "GET",
    data: bounds.toJSON(),
    dataType: "json",
    success: (response) =>{
      updateParkingLots(response, parkList);
    }
  });
}

function updateParkingLots(response, parkList){
  var parkingData = JSON.parse(response);
  parkingData.forEach(pLot =>{
    var key = `${pLot.coordinates.lat}-${pLot.coordinates.lng}`;
    if(parkList[key] == null) parkList[key] = new parkingLot(pLot, map);
    else{
      parkList[key].update(pLot);
    }
  });
}
