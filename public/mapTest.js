function requestData(parkList, map){
  $.ajax({
    url: "parkingTestData.json",
    method: "GET",
    dataType: "json",
    success: (response) =>{
      for(const id in response){
        var newLot = response[id];
        var key = `${newLot.coordinates.lat}-${newLot.coordinates.lng}`;
        if(parkList[key] == null) parkList[key] = new parkingLot(newLot, map);
        else{
          parkList[key].update(newLot);
        }
      }
    }
  });
}
