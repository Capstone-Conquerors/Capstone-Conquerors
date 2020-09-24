$.ajax({
  url: "/getParkingLot",
  success: function(response){
    console.log("Message: \n");
    console.log(response);
  }
});
