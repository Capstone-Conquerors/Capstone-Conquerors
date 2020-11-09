class parkingLot{
  static RED = "#FF0000";
  static YELLOW = "#FFFF00";
  static GREEN = "#00CC00";

  static INFO_FORMAT = `<div>
                          <h2>{title}</h2>
                          <h3>Capacity: {capacity}</h3>
                          <h3>Available: {available}</h3>
                        </div>`;

  static infoWindows = [];

  constructor(lotData, map){
    this.coordinates = lotData.coordinates;
    this.capacity = lotData.capacity;
    this.available = lotData.available;
    this.size = lotData.size;
    this.title = lotData.title;
    this.map = map;
    this.calcOccupancy();
    this.addToMap();
    this.addInfo();
  }

  update(newLotData){
    this.available = newLotData.available;
    this.calcOccupancy();
    this.updateInfo();
    this.updateColor();
  }

  updateInfo(){
    this.info.setContent(this.genInfoStr());
  }

  updateColor(){
    var newColor = this.getColor();
    var newOptions = {"fillColor" : newColor,
                      "strokeColor": newColor};
    this.parkingDraw.setOptions(newOptions);
  }

  addToMap(){
    var color = this.getColor();
    this.parkingDraw = new google.maps.Circle({
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.35,
      center: this.coordinates,
      radius: this.size
    });
    this.parkingDraw.setMap(this.map);
  }

  calcOccupancy(){
    this.occupancy = 1 - this.available/this.capacity;
  }

  getColor(){
    if(this.occupancy >= 0.7) return parkingLot.RED;
    else if(this.occupancy >= 0.5 ) return parkingLot.YELLOW;
    else return parkingLot.GREEN;
  }

  genInfoStr(){
    var infoStr = parkingLot.INFO_FORMAT.toString();
    infoStr = infoStr.replace("{title}", this.title)
                     .replace("{capacity}", this.capacity)
                     .replace("{available}", this.available);
    return infoStr;
  }

  addInfo(){
    this.info = new google.maps.InfoWindow({
      content: this.genInfoStr(),
      position: this.parkingDraw.center
    });
    parkingLot.infoWindows.push(this.info);
    google.maps.event.addListener(this.parkingDraw, 'click', () =>{
      parkingLot.infoWindows.forEach(window => window.close());
      this.info.open(this.parkingDraw.map);
    });
  }

}
