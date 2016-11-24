var L = require('leaflet')
var esri = require('esri-leaflet')

module.exports = FootprintMap

function FootprintMap (opts) {
  var mapOptions = {
    minZoom: 16,
    maxZoom: 19,
    center: [48.535903, -123.018723],
    zoom: 17,
    dragging: false,
    keyboard: false,
    tap: false
  }
  if (!(this instanceof FootprintMap)) return new FootprintMap(opts)
  this.element = document.createElement('div')
  var map = L.map(opts.mapId, mapOptions)
  var baseLayer = esri.tiledMapLayer({
    url: 'https://sjcgis.org/arcgis/rest/services/Basemaps/Aerials_2013_WM/MapServer',
    maxZoom: 19
  })
  baseLayer.addTo(map)

  this.zoomTo = function (latlng, z) {
    map.setView(latlng, z)
  }

  this.addGeojson = function (gj) {
    L.geoJson(gj).addTo(map)
  }
}
