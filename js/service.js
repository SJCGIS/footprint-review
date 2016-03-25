var Leaflet = require('leaflet');
require('esri-leaflet');
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');

module.exports = Service;

function Service(opts) {
    EventEmitter.call(this);
    var service = L.esri.Services.featureLayerService({
        url: opts.url,
        proxy: opts.proxy || '',
        token: opts.token || ''
    }).query();

    this.getFeatures = function(oid, callback) {
        service.where("OBJECTID=" + oid);
        service.run(callback);
    };
}

inherits(Service, EventEmitter);
