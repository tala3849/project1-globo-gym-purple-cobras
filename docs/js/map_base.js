mapboxgl.accessToken = 'pk.eyJ1IjoiamVubmluZ3NhbmRlcnNvbiIsImEiOiIzMHZndnpvIn0.PS-j7fRK3HGU7IE8rbLT9A';
var map = new mapboxgl.Map({
    container: 'map',
    zoom: 3,
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
          'circle-color': 'red',
          'circle-opacity': 0.5
      },
      layout: {'visibility':'visible'}
    })

    map.addLayer({
      id: 'on-network',
      type: 'circle',
      source: 'onNetwork',
      paint: {
          'circle-color': 'green',
          'circle-opacity': 0.5
      },
      layout: {'visibility':'visible'}
    })
  });

  var popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false
      });

  map.on('mousemove', function(){
    
  })

  map.on('mouseenter', 'on-network', function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(JSON.stringify(e.features[0].properties))
        .addTo(map);
  });

  map.on('mouseleave', 'on-network', function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

}
