/* Map interaction */

var min_cost = 0;
var max_cost = 1000000

function toggleMapLayerVis(layerID){
  map.setLayoutProperty( layerID,'visibility',
  ( map.getLayoutProperty(layerID,'visibility')=='visible'? 'none' : 'visible') )
}

var MapFilters = function(){

  this.all = 'all'

  this.filters = []

  this.addFilter = function(arr){
    this.filters.push(arr)
  }

  this.hasFilter = function(value){
    return this.filters.map(function(x){return x[1]}).indexOf(value)
  }

  this.updateFilter = function(comp,prop,val){
    var new_filters = [];
    if(!this.filters.length){
      this.filters.push([comp,prop,val])
      return;
    }
    this.filters.forEach(function(filter){
      if(filter[0]==comp && filter[1]==prop){
        new_filters.push([comp,prop,val])
      }else{
        new_filters.push(filter)
      }
    })
    this.filters = new_filters
  }

  this.getFilters = function(){
    if (this.filters.length){
      return [this.all].concat(this.filters)
    }else{
      return []
    }
  }
}

var mapFilters = new MapFilters()

function updateFiltersOnAllLayers(){
  
  activeMapLayers.forEach(function(layerID){
    map.setFilter(layerID, mapFilters.getFilters())
  })
}



function toggleOpportunity(opp_level){
  console.log("opportunity: "+opp_level)

  if(mapFilters.hasFilter(opp_level)){
    mapFilters.addFilter('>', opp_level, 1)
    updateFiltersOnAllLayers()
  }else{
    mapFilters.updateFilters('>=', opp_level, 0)
    updateFiltersOnAllLayers()
  }
}



var wait = setInterval(function(){
  if(map.loaded()){
    // document.getElementById('min_cost').addEventListener("change", function(e){
    //   min_cost = Number(e.target.value);
    //   document.getElementById('min_cost_val').innerHTML = makeBigNumbersPretty(min_cost)
    //
    //   mapFilters.updateFilter('>=','cost',min_cost)
    //   updateFiltersOnAllLayers()
    // });

    document.getElementById('max_cost').addEventListener("change", function(e){
      max_cost = Math.exp(Number(e.target.value));
      document.getElementById('max_cost_val').innerHTML = '$' + makeBigNumbersPretty(max_cost)

      mapFilters.updateFilter('<=','cost',max_cost)
      updateFiltersOnAllLayers()
    });
    console.log("map loaded, clearing interaction pause")
    clearInterval(wait)
  }else{
    console.log('waiting on map to load interaction')
  }
},500)
