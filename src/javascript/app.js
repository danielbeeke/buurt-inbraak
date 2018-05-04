import L from './leaflet.es6.js';
import mapboxgl from './mapbox-gl.es6.js';
import leafletMapboxgl from './leaflet-mapbox-gl.es6.js';
leafletMapboxgl(L, mapboxgl);


var map = L.map('map').setView([38.912753, -77.032194], 15);
L.marker([38.912753, -77.032194])
  .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
  .addTo(map)
  .openPopup();
var gl = L.mapboxGL({
  style: 'https://free.tilehosting.com/styles/basic/style.json?key=XOnhCKrOit6tkshgs13C',
  accessToken: 'no-token'
}).addTo(map);

