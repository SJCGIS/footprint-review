var L = require('leaflet')
require('esri-leaflet')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

module.exports = Service

function Service (opts) {
  var self = this
  EventEmitter.call(this)
  var service = L.esri.Services.featureLayerService({
    url: opts.url,
    proxy: opts.proxy || '',
    token: opts.token || ''
  })
  var query = service.query()

  var oId = opts.oId || null

  this.getFeatures = function (callback, context) {
    query.where('OBJECTID=' + this.oId())
    query.run(callback)
  }

  this.service = function () {
    return service
  }

  this.setoId = function (newoId) {
    oId = newoId
    self.emit('service::oIdChange', newoId)
  }

  this.oId = function () {
    return oId
  }
}

inherits(Service, EventEmitter)
