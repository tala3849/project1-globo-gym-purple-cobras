mapboxgl.accessToken = 'pk.eyJ1IjoiamVubmluZ3NhbmRlcnNvbiIsImEiOiIzMHZndnpvIn0.PS-j7fRK3HGU7IE8rbLT9A';
var map = new mapboxgl.Map({
    container: 'map',
    zoom: 3,
    hash:true,
    center: [-96.78, 37.43],
    style:'mapbox://styles/mapbox/light-v9'
  });

// map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

var activeMapLayers = [
  'off-network','on-network'
]

function loadMap(){
  map.once('load',function(){

    map.addSource('onNetwork', {
      type: 'geojson',
      data: pageData.onNetworkBuildings
    })
    map.addSource('offNetwork', {
      type: 'geojson',
      data: pageData.offNetworkBuildings
    })

    map.addLayer({
      id: 'off-network',
      type: 'circle',
      source: 'offNetwork',
      paint: {
          'circle-color': '#005d77',
          'circle-opacity': 0.5
      },
      layout: {'visibility':'visible'}
    })

    map.addLayer({
      id: 'on-network',
      type: 'circle',
      source: 'onNetwork',
      paint: {
          'circle-color': '#f58233',
          'circle-opacity': 0.5
      },
      layout: {'visibility':'visible'}
    })

    var popup = new mapboxgl.Popup({clickToClose: true})

    map.on('mousemove', function (e) {
      if (map.getZoom()>10){
        map.getCanvas().style.cursor = 'pointer'
        var features = map.queryRenderedFeatures(e.point,{layers: activeMapLayers});

        if(!features.length){popup.remove(); return}

        popup.setLngLat(e.lngLat)
          .setHTML(JSON.stringify(features[0].properties))
          .addTo(map);

      }else{
        map.getCanvas().style.cursor = ''
      }
    });
    //Once map is loaded, enable controls
    document.getElementById('map-interaction').style.opacity = 1;
  });
};
