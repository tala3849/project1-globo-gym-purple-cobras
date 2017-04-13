mapboxgl.accessToken = 'pk.eyJ1IjoiamVubmluZ3NhbmRlcnNvbiIsImEiOiIzMHZndnpvIn0.PS-j7fRK3HGU7IE8rbLT9A';
var map = new mapboxgl.Map({
    container: 'map',
    zoom: 3,
    center: [-96.78, 37.43],
    style:'mapbox://styles/mapbox/light-v9'
  });

// map.scrollZoom.disable();
map.addControl(new mapboxgl.NavigationControl());

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
      }
    })

    map.addLayer({
      id: 'on-network',
      type: 'circle',
      source: 'onNetwork',
      paint: {
          'circle-color': 'green',
          'circle-opacity': 0.5
      }
    })
  });
}
