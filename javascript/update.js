import Moment from "./moment.es6.js";

const cartoDbKey = "7a21536f8d4e92fae1a647e6bf47355b95d49df3";
const cartoUpdateUrl = "https://danielbeeke.carto.com/api/v2/sql?q=";
const lastUpdateQuery = "SELECT date FROM misdaad ORDER BY date DESC LIMIT 1";
const moment = new Moment();
const politieDataUrl = "https://cors-anywhere.herokuapp.com/http://www.politie.nl/getCMData.json";

Array.prototype.chunk = function (groupsize){
  var sets = [], chunks, i = 0;
  chunks = this.length / groupsize;

  while(i < chunks){
    sets[i] = this.splice(0,groupsize);
    i++;
  }

  return sets;
};

fetch(cartoUpdateUrl + encodeURI(lastUpdateQuery)).then(response => response.json()).then((response) => {
  const lastDate = moment(response.rows[0].date);
  const today = moment().subtract(1, "day");

  if (lastDate.isBefore(today)) {
    fetch(politieDataUrl).then(response => response.json()).then((response) => {
      let values = [];

      response.forEach(row => {
        let rowDate = moment(row.data.datum, "DD-MM-YYYY");

        if (rowDate.isAfter(lastDate)) {
          values.push(`(
            ST_GeomFromText('POINT(${row.lng} ${row.lat})', 4326), 
            '${row.data.categorie}', 
            '${row.data.categorieId}', 
            '${rowDate.format("MM-DD-YYYY")}', 
            '${row.data.postcode}'
          )`);
        }
      });

      values.chunk(20).forEach((valuesSubSet) => {
        let query = encodeURI(`INSERT INTO misdaad (the_geom, category, categoryId, date, postal_code) VALUES `) +  valuesSubSet.join(",");
        let updateUrlWithQuery = cartoUpdateUrl + query + "&api_key=" + cartoDbKey;
        fetch(updateUrlWithQuery);
      })
    });
  }
});