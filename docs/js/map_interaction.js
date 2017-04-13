/* Map interaction */

var min_cost = 0;
var max_cost = 1000000

function toggleMapLayerVis(layerID){
  map.setLayoutProperty( layerID,'visibility',
  ( map.getLayoutProperty(layerID,'visibility')=='visible'? 'none' : 'visible') )
}

function applyMapFilterToAllLayers(prop,val){
  activeMapLayers.forEach(function(layerID){
    map.setFilter(layerID,
      ['==',prop,val]
    )
  })
}

function applyMapFilterToAllLayers(prop,val){

}

function applyMapFilterToAllLayers(prop,val){
  activeMapLayers.forEach(function(layerID){
    map.setFilter(layerID,
      ['==',prop,val]
    )
  })
}

document.getElementById('min_cost').addEventListener("change", function(e){
  min_cost = Number(e.target.value);
  document.getElementById('min_cost_val').innerHTML = makeBigNumbersPretty(min_cost)
  activeMapLayers.forEach(function(layerID){
    map.setFilter(layerID, ['all',
      ['>=','cost', min_cost],
      ['<=','cost', max_cost]
    ])
  })
});

document.getElementById('max_cost').addEventListener("change", function(e){
  max_cost = Number(e.target.value);
  document.getElementById('max_cost_val').innerHTML = makeBigNumbersPretty(max_cost)
  activeMapLayers.forEach(function(layerID){
    map.setFilter(layerID, ['all',
      ['>=','cost', min_cost],
      ['<=','cost', max_cost]
    ])
  })
});
