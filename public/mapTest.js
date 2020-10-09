function initTestData(drawingFunct, infoFunct, map){
  $.ajax({
    url: "parkingTestData.json",
    method: "GET",
    dataType: "json",
    success: (response) =>{
      for(const id in response){
        var parkingLot = response[id];
        var occupated = Math.round(Math.random() * parkingLot.capacity);
        var pLotArea = drawingFunct(parkingLot.coordinates, parkingLot.capacity, occupated, parkingLot.size, map);

        parkingLot.available = parkingLot.capacity - occupated;
        infoFunct(pLotArea, parkingLot);
      }
    }
  });
}
