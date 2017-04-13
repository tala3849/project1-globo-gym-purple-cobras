/*
  General Page functions should go here
*/

function toggleVis(btn, id){
  document.getElementById(id).style.display = (document.getElementById(id).style.display=='block')? 'none' : 'block'
  document.getElementById(btn).className = (document.getElementById(btn).className=='btn')? 'btn btn--stroke' : 'btn';
}

var DataObject = function(config){
  this.dir = config.dir

  this.onNetworkBuildings  = false
  this.offNetworkBuildings = false
  this.products = true

  this.load = function(){
    console.log("Loading data from directory: ",config.dir)
    var that = this

    d3.json(this.dir+'/offNetwork.geojson', function(offNetworkBuildings){
      console.log("Loaded Off Network buildings")
      that.offNetworkBuildings = offNetworkBuildings
    });

    d3.json(that.dir+'/onNetwork.geojson', function(onNetworkBuildings){
      console.log("Loaded On Network buildings")
      that.onNetworkBuildings = onNetworkBuildings
    })

    // uncomment this...
    d3.csv(that.dir+'/services_per_product.csv',function(csv){
      that.products = csv;
    })
  }
}
