var FootprintMap = require('./map')

module.exports = Review

function Review() {
    var voteOpts = {
        "voteSjc": {
            "field": "SJC_VOTES",
            "storageId": "voteSjc"
        },
        "votePict": {
            "field": "PICT_VOTES",
            "storageId": "votePict"
        },
        "voteSkip": {
            "field": "SKIPS",
            "storageId": "voteSkip"
        },
        "voteFlag": {
            "field": "FLAGS",
            "storageId": "voteFlag"
        }
    }

    var map1 = FootprintMap({'mapId': 'map1'})
    var map2 = FootprintMap({'mapId': 'map2'})
    var currentId
    var currentLocation
    var proxyUrl = '/proxy/proxy.ashx'
    var token = 'KoVc8IZLRBBdFTVAd3Vt6yvv64edhF5FE-YbjfZ0tB5tsobPpnSuNMtxEUhTThzDJvFZbVZJXQGkhLJIcHtTUMVee9ltT6ldOoTH1B4zQkavCq5ts0dF5bhBgp5c3XmbZIkK_5tNJJAd9FjYIqZZng..'

    var sjcFootprintsQuery = L.esri.Services.featureLayerService({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/1',
        //proxy: proxyUrl,
        token: token

    }).query()
    var pictFootprintsQuery = L.esri.Services.featureLayerService({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/2',
        //proxy: proxyUrl,
        token: token
    }).query()
    var locationLayer = L.esri.Services.featureLayerService({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/0',
        //proxy: proxyUrl,
        token: token
    })


    var query = locationLayer.query()

    /**
     * This function finds a random compare location and passes the
     location to the handler
     * @param {min} minimum inclusive feature id for random function
     * @param {max} maximum inclusive feature id for random function
     */
    this.getNewLocation = function(min, max) {
        currentId = Math.floor(Math.random() * (max- min + 1)) + min
        query.where("OBJECTID = " + currentId)
        query.run(locationHandler)
    }

    /**
     * This function sets the location and footprint geojson to the
     map called in the parameter
     * @param {map} Footprint map to set the layer and location
     * @param {gj} GeoJSON object describing the footprint to place on
     the map
     */
    function setFootprint(map, gj) {
        map.zoomTo([currentLocation[1], currentLocation[0]], 19)
        map.addGeojson(gj)
    }

    /**
     * This function sets the current location var and retrieves the
     footprints as GeoJSON objects. The GeoJSON objects are passed
     to the setFootprint function
     * @param {err} error message from location call
     * @param {fc} GeoJSON feature collection from query
     */
    function locationHandler(err, fc) {
        if (err) throw new Error(err.message)
        currentLocation = fc.features[0].geometry.coordinates
        getFootprint(sjcFootprintsQuery, fc.features[0].properties.SJC_Footprints_OBJECTID, function(fc) {
            setFootprint(map1, fc)
        })
        getFootprint(pictFootprintsQuery, fc.features[0].properties.PICT_Footprints_OBJECTID, function(fc) {
            setFootprint(map2, fc)
        })
    }

    /**
     * This function queries the service and passes the result
     to the callback function
     * @param {query} the query service used
     * @param {oid} the object id to query for
     * @param {callback} the callback function to call when
query is complete
     */
    function getFootprint(query, oid, callback) {
        query.where("OBJECTID = " + oid)
        query.run(function(err, fc) {
            if (err) throw new Error(err.message)
            callback(fc)
        })
    }

    function submitVote(vote) {
        getFootprint(query, currentId, function(fc) {
            voteHandler(vote, fc)
        })
    }

    function voteHandler(vote, fc) {

    }
}
