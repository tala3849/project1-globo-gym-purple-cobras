/* Map interaction */

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
