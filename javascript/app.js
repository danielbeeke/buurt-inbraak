import L from "./leaflet.es6.js";
import mapboxgl from "./mapbox-gl.es6.js";
import leafletMapboxgl from "./leaflet-mapbox-gl.es6.js";
import leafletMarkercluster from "./leaflet.markercluster.es6.js";
import leafletHash from "./leaflet-hash.es6.js";
import Moment from "./moment.es6.js";
import Dygraph from "./dygraph.es6.js";
import Sprinkhaan from "./sprinkhaan/js/Sprinkhaan.js";

leafletMapboxgl(L, mapboxgl);
leafletMarkercluster(L);
leafletHash(L);

class BuurtInbraak {
  /**
   * Initiate the buurt inbraak map with an element ID.
   * @param mapId
   */
  constructor (mapId) {
    this.timeout = false;
    this.moment = new Moment();
    this.abortController = new AbortController();
    this.dbTimeFormat = "YYYY-MM-DD hh:mm:ss";
    this.map = L.map(mapId, {
      attributionControl: false,
      zoomControl: false,
      maxZoom: 18
    }).setView([52.1, 5], 9);

    this.mapLayer = L.mapboxGL({
      style: "https://free.tilehosting.com/styles/darkmatter/style.json?key=XOnhCKrOit6tkshgs13C",
      accessToken: "no-token"
    }).addTo(this.map);

    new L.Hash(this.map);

    this.markerCluster = new L.markerClusterGroup({
      singleMarkerMode: true,
      animate: false,
      showCoverageOnHover: false,
      iconCreateFunction: cluster => this.iconCreate(cluster)
    });

    this.markerCluster.on("animationend", () => {
      this.resizeMarkers();
    });

    this.map.addLayer(this.markerCluster);
    this.map.on("moveend", () => {
      this.fetchMarkers();
    });

    this.map.on("movestart", () => {
      this.clearData();
    });

    this.map.on("zoomend", () => {
      this.fetchMarkers();
    });

    document.querySelector("#start-date").valueAsDate = this.moment().subtract(6, "month").toDate();
    document.querySelector("#end-date").valueAsDate = new Date();

    Array.from(document.querySelectorAll("input")).forEach((input) => {
      input.addEventListener("change", () => {
        this.fetchMarkers();
      });
    });

    this.fetchMarkers();

    this.sprinkhaan = new Sprinkhaan();
    this.sprinkhaan.expand(() => {
      if (window.innerWidth < 800) {
        this.sprinkhaan.collapse();
      }

    });
  }

  createGraph (data) {
    if (!data) return;

    let transformedData = [];

    data.forEach((row) => {
      transformedData.push([this.moment(row.date).toDate(), row.ct1, row.ct2]);
    });

    this.graphElement = document.querySelector(".graph");


    let legendFormatter = (data) => {
      if (data.x == null) {
        // This happens when there's no selection and {legend: 'always'} is set.
        return "<br>" + data.series.map(function(series) { return series.dashHTML + " " + series.labelHTML; }).join("<br>");
      }

      let html = "Datum : " + this.moment(data.x).format("DD-MM-YYYY");
      data.series.forEach(function(series) {
        if (!series.isVisible) return;
        let labeledData = series.labelHTML + ": " + series.yHTML;
        if (series.isHighlighted) {
          labeledData = "<b>" + labeledData + "</b>";
        }
        html += "<br>" + series.dashHTML + " " + labeledData;
      });
      return html;
    };


    this.graph = new Dygraph(this.graphElement, transformedData,
      {
        gridLineColor: "black",
        zoomCallback: () => {
          let range = this.graph.xAxisRange();

          let fromDate = this.moment(range[0]).toDate();
          let tillDate = this.moment(range[1]).toDate();

          document.querySelector("#start-date").valueAsDate = fromDate;
          document.querySelector("#end-date").valueAsDate = tillDate;

          this.fetchMarkers();
        },
        highlightCircleSize: 5,
        labelsDiv: "graph-labels",
        hideOverlayOnMouseOut: false,
        legendFormatter: legendFormatter,
        labels: [ "", "Inbraak", "Poging tot inbraak"],
        colors: ["#ac0000", "#ffad00"]
      });
  }

  clearData () {
    if (this.timeout) {
      this.abortController.abort();
      document.body.classList.add("is-loading-data");
      this.markerCluster.clearLayers();
      clearTimeout(this.timeout);
    }
  }

  /**
   * Gets the current state, converts those to filters and downloads the markers.
   */
  fetchMarkers () {
    this.clearData();

    this.timeout = setTimeout(() => {
      let viewport = this.map.getBounds().toBBoxString();

      let startDate = document.querySelector("#start-date").valueAsDate;
      let endDate = document.querySelector("#end-date").valueAsDate;

      startDate = this.moment(startDate, "YYYY-DD-MM").format(this.dbTimeFormat);
      endDate = this.moment(endDate, "YYYY-DD-MM").format(this.dbTimeFormat);

      let categories = [];
      if (document.querySelector("#woninginbraak:checked")) categories.push(document.querySelector("#woninginbraak:checked").value);
      if (document.querySelector("#poging-tot-woninginbraak:checked")) categories.push(document.querySelector("#poging-tot-woninginbraak:checked").value);

      let mapQuery = this.createMapQuery(viewport, startDate, endDate, categories);
      let mapQueryUrl = `https://danielbeeke.carto.com/api/v2/sql?q=${mapQuery}&format=GeoJSON`;

      fetch(mapQueryUrl)
        .then(response => response.json())
        .then((response) => {
          document.body.classList.remove("is-loading-data");
          this.createMarkers(response);
        });

      let graphQuery = this.createGraphQuery(viewport, startDate, endDate, categories);
      let graphQueryUrl = `https://danielbeeke.carto.com/api/v2/sql?q=${graphQuery}&format=JSON`;

      fetch(graphQueryUrl)
        .then(response => response.json())
        .then((dateRows) => {
          document.body.classList.remove("is-loading-data");
          this.createGraph(dateRows.rows);
        });
    }, 400);
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

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("pie");

    cluster.total = count1 + count2;
    if (this.max < cluster.total) this.max = cluster.total;
    if (this.min > cluster.total) this.min = cluster.total;

    this.createPie(svg, [
      { percent: 1 / cluster.total * count1, className: "woninginbraak" },
      { percent: 1 / cluster.total * count2, className: "poging-tot-woninginbraak" },
    ]);

    return new L.DivIcon({
      html: svg.outerHTML + `<span class="total number"><span class="number-inner">${cluster.total}</span></span>`,
      iconSize: [4, 4],
      iconAnchor: [2, 2],
    });
  }

  /**
   * A SVG pie chart generator.
   * @param element
   * @param slices
   */
  createPie (element, slices) {
    element.setAttributeNS (null, "viewBox", "-1 -1 2 2");
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
        "L 0 0",
      ].join(" ");

      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", pathData);
      pathEl.setAttribute("class", slice.className);
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
    response.features.forEach((row) => {
      let marker = new L.Marker([row.geometry.coordinates[1], row.geometry.coordinates[0]]);
      marker.data = row;
      this.markerCluster.addLayer(marker);
    });

    this.resizeMarkers();
  }

  /**
   * At the end of animation resize the markers.
   */
  resizeMarkers () {
    this.markerCluster._featureGroup.getLayers().forEach((cluster) => {
      if (!cluster.total) cluster.total = cluster.data.properties.count;
      let count = cluster.total - this.min;
      let percentage = 100 / this.max * count;

      let size = Math.round(35 + (percentage * 0.5)) + "px";
      cluster._icon.style.width = size;
      cluster._icon.style.height = size;
      if (cluster.total) {
        cluster._icon.dataset.numberCount = cluster.total.toString().length;
      }
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
  createMapQuery (viewport, dateStart, dateEnd, categories = [1, 2]) {
    let zoom = this.map.getZoom();
    let precision = 2;

    let precisionMap = {
      7: 3,
      8: 4,
      9: 4,
      10: 5,
      11: 5,
      12: 6,
      13: 7,
      14: 7,
      15: 13
    };

    if (precisionMap[zoom]) {
      precision = precisionMap[zoom];
    }

    if (zoom > 15) precision = 8;

    return `
      SELECT 
      st_makepoint(avg(st_x(the_geom)), avg(st_y(the_geom))) as the_geom,
      sum(case when categoryId != '' then 1 else 0 end) as count, 
      sum(case when categoryId = '1' then 1 else 0 end) as ct1, 
      sum(case when categoryId = '2' then 1 else 0 end) as ct2, 
      min(date) as date FROM misdaad WHERE ST_Contains(ST_MakeEnvelope(${viewport}, 4326), the_geom) 
      AND date >= ('${dateStart}') AND date <= ('${dateEnd}') 
      AND categoryId IN ('${categories.join("','")}') 
      GROUP BY substring(ST_GeoHash(the_geom), 1, ${precision}) ORDER BY date`;
  }


  /**
   *
   * @param viewport A leaflet bounding box.
   * @param dateStart A moment js parseable date.
   * @param dateEnd A moment js parseable date.
   * @param categories 1: woninginbraak, 2: poging-tot-woninginbraak
   * @returns {string} A postGis query.
   */
  createGraphQuery (viewport, dateStart, dateEnd, categories = [1, 2]) {
    return `
      SELECT 
      date,
      st_makepoint(avg(st_x(the_geom)), avg(st_y(the_geom))) as the_geom,
      sum(case when categoryId != '' then 1 else 0 end) as count, 
      sum(case when categoryId = '1' then 1 else 0 end) as ct1, 
      sum(case when categoryId = '2' then 1 else 0 end) as ct2 
      FROM misdaad WHERE ST_Contains(ST_MakeEnvelope(${viewport}, 4326), the_geom) 
      AND date >= ('${dateStart}') AND date <= ('${dateEnd}') 
      AND categoryId IN ('${categories.join("','")}') 
      GROUP BY date ORDER BY date`;
  }
}

new BuurtInbraak("map");