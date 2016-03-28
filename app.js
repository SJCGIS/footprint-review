var VoteService = require('./js/vote-service');
var Service = require('./js/service');
var FootprintMap = require('./js/map');

module.exports = App;

function App() {
    var map1 = new FootprintMap({
        mapId: 'map1'
    });
    var map2 = new FootprintMap({
        mapId: 'map2'
    });

    var sjcFootprint = new Service({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/1'
    });
    var pictFootprint = new Service({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/2'
    });

    var fpService = new VoteService({
        url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/0',
        min: 0,
        max: 18772,
        voteFields: {
            'voteSjc': 'SJC_VOTES',
            'votePict': 'PICT_VOTES',
            'voteSkip': 'SKIPS',
            'voteFlag': 'FLAGS'
        },
        fpIdFields: {
            'sjc': 'SJC_Footprints_OBJECTID',
            'pict': 'PICT_Footprints_OBJECTID'
        }
    });

    var buttons = document.querySelectorAll('.vote-button');
    for(var i = 0; i < buttons.length; i++ ){
        buttons[i].addEventListener('click', function(e) {
            disableVoting();
            fpService.addVote(e.target.name);
        });
    };

    sjcFootprint.on('service::oIdChange', function(id) {
        sjcFootprint.getFeatures(function(err, fc) {
            if (err) throw err;
            map1.addGeojson(fc);
        });
    });

    pictFootprint.on('service::oIdChange', function(id) {
        pictFootprint.getFeatures(function(err, fc) {
            if (err) throw err;
            map2.addGeojson(fc);
        });
    });

    fpService.on('vote-service::addVote', function() {
        return getNew();
    });

    var disableVoting = function() {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        };
    };

    var enableVoting = function() {
        for(var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = false;
        };
    };

    var getNew = function() {
        fpService.getRandomFeature(function(err, fc) {
            if (err) throw err;
            var coords = fc.features[0].geometry.coordinates;
            map1.zoomTo([coords[1], coords[0]], 19);
            map2.zoomTo([coords[1], coords[0]], 19);
            sjcFootprint.setoId(fc.features[0].properties[fpService.fpIdFields['sjc']]);
            pictFootprint.setoId(fc.features[0].properties[fpService.fpIdFields['pict']]);
            enableVoting();
        });
    };
    getNew();
};
