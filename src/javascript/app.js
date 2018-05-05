import L from './leaflet.es6.js';
import mapboxgl from './mapbox-gl.es6.js';
import leafletMapboxgl from './leaflet-mapbox-gl.es6.js';
import leafletMarkercluster from './leaflet.markercluster.es6.js';
import Moment from './moment.es6.js';

leafletMapboxgl(L, mapboxgl);
leafletMarkercluster(L);

class BuurtInbraak {
  /**
   * Initiate the buurt inbraak map with an element ID.
   * @param mapId
   */
  constructor (mapId) {
    this.moment = new Moment();
    this.dbTimeFormat = 'YYYY-MM-DD hh:mm:ss';
    this.map = L.map(mapId, {
      attributionControl: false,
      maxZoom: 18
    }).setView([52.1, 5], 9);

    this.mapLayer = L.mapboxGL({
      style: 'https://free.tilehosting.com/styles/darkmatter/style.json?key=XOnhCKrOit6tkshgs13C',
      accessToken: 'no-token'
    }).addTo(this.map);

    this.markerCluster = new L.markerClusterGroup({
      singleMarkerMode: true,
      showCoverageOnHover: false,
      iconCreateFunction: cluster => this.iconCreate(cluster)
    });

    this.map.addLayer(this.markerCluster);
    this.fetchMarkers();
  }

  /**
   * Gets the current state, converts those to filters and downloads the markers.
   */
  fetchMarkers () {
    let viewport = this.map.getBounds().toBBoxString();
    let query = this.createQuery(viewport, '2017-01-01', '2019-01-01');
    let queryUrl = `https://danielbeeke.carto.com/api/v2/sql?q=${query}&format=GeoJSON`;

    fetch(queryUrl)
    .then(response => response.json())
    .then((response) => {
      this.createMarkers(response);
    });
  }

  /**
   * This function creates the cluster icon, it creates the pie inside the cluster.
   * @param cluster
   * @returns {DivIcon}
   */
  iconCreate (cluster) {
    let count1 = 0;
    let count2 = 0;

    cluster.getAllChildMarkers().forEach((child) => {
      count1 = count1 + child.data.properties.ct1;
      count2 = count2 + child.data.properties.ct2;
    });

    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('pie');

    let total = count1 + count2;
    svg.dataset.numberCount = total.toString().length;
    if (this.max < total) this.max = total;
    if (this.min > total) this.min = total;

    this.createPie(svg, [
      { percent: 1 / total * count1, className: 'inbraak' },
      { percent: 1 / total * count2, className: 'poging-tot-inbraak' },
    ]);

    return new L.DivIcon({
      html: svg.outerHTML,
    });
  }

  /**
   * A SVG pie chart generator.
   * @param element
   * @param slices
   */
  createPie (element, slices) {
    element.setAttributeNS (null, 'viewBox', '-1 -1 2 2');
    let cumulativePercent = 0;

    let getCoordinatesForPercent = (percent) => {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    };

    slices.forEach(slice => {
      const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
      cumulativePercent += slice.percent;
      const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
      const largeArcFlag = slice.percent > .5 ? 1 : 0;
      const pathData = [
        `M ${startX} ${startY}`,
        `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
        `L 0 0`,
      ].join(' ');

      const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      pathEl.setAttribute('d', pathData);
      pathEl.setAttribute('class', slice.className);
      element.appendChild(pathEl);
    });
  }

  /**
   * From GeoJSON this function places the markers on the map.
   * @param response
   */
  createMarkers (response) {
    this.min = 100000;
    this.max = 0;
    this.markerCluster.clearLayers();
    response.features.forEach((row) => {
      let marker = new L.Marker([row.geometry.coordinates[1], row.geometry.coordinates[0]]);
      marker.data = row;
      this.markerCluster.addLayer(marker);
    });
  }

  /**
   *
   * @param viewport A leaflet bounding box.
   * @param dateStart A moment js parseable date.
   * @param dateEnd A moment js parseable date.
   * @param categories 1: woninginbraak, 2: poging-tot-woninginbraak
   * @returns {string} A postGis query.
   */
  createQuery (viewport, dateStart, dateEnd, categories = [1, 2]) {
    dateStart = this.moment(dateStart).format(this.dbTimeFormat);
    dateEnd = this.moment(dateEnd).format(this.dbTimeFormat);

    return `
      SELECT DISTINCT ON (postal_code, date) postal_code, 
      sum(case when categoryId != '' then 1 else 0 end) as count, 
      sum(case when categoryId = '1' then 1 else 0 end) as ct1, 
      sum(case when categoryId = '2' then 1 else 0 end) as ct2, 
      min(date) as date, 
      the_geom FROM misdaad WHERE ST_Contains(ST_MakeEnvelope(${viewport}, 4326), the_geom) 
      AND date >= ('${dateStart}') AND date <= ('${dateEnd}') 
      AND categoryId IN ('${categories.join("','")}') 
      GROUP BY the_geom, postal_code ORDER BY date`;
  }
}

new BuurtInbraak('map');