/*
  General Page functions should go here
*/

function makeBigNumbersPretty(num){
  var str;
  if (num > 1000000){
    return (num/1000000).toFixed(1) + "M"
  }
  if (num > 1000){
    return (num/1000).toFixed(1) + "K"
  }
  return num.toFixed(0)
}

function toggleVis(btn, id){
  document.getElementById(id).style.display = (document.getElementById(id).style.display=='block')? 'none' : 'block'
  document.getElementById(btn).className = (document.getElementById(btn).className=='btn')? 'btn btn--stroke' : 'btn';
}

var DataObject = function(config){
  this.dir = config.dir

  this.onNetworkBuildings  = false
  this.offNetworkBuildings = false

  this.load = function(){
    console.log("Loading data from directory: ",config.dir)
    var that = this

    d3.json(this.dir+'/offNetwork_buildings_sm.geojson', function(offNetworkBuildings){
      console.log("Loaded Off Network buildings")
      that.offNetworkBuildings = offNetworkBuildings
      that.max_build_cost = d3.max(offNetworkBuildings.features.map(function(x){return x.properties.cost}))
      document.getElementById('max_cost').max   = Math.log(that.max_build_cost)
      document.getElementById('max_cost').value = Math.log(that.max_build_cost)
      document.getElementById('max_cost_val').innerHTML = '$' + makeBigNumbersPretty(that.max_build_cost)
    });

    d3.json(that.dir+'/onNetwork_buildings_sm.geojson', function(onNetworkBuildings){
      console.log("Loaded On Network buildings")
      that.onNetworkBuildings = onNetworkBuildings
    })

    // uncomment this...
    d3.csv(that.dir+'/services_per_product.csv',function(csv){
      that.services = csv;
    })

    d3.csv(that.dir+'/buildings_per_product.csv',function(csv){
      that.products = csv;
    })

  }
}
