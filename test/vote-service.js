var test = require('tape');
var VoteService = require('../js/vote-service');

var opts = {
    url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/1',
    token: 'SY0mQwJef4qWQC0REq5uoHGLscS5TKLKx8kolbf9WoqhltWVd8lo4AtbbxUqc3kKpvHQ_Dx5Umz_CJekF1z5fkpxosVJ-QeKtQSSTBa9SfrwoP7fmIgeiZDh16zharIv',
    voteFields: {
        'voteSjc': 'SJC_VOTES',
        'votePict': 'PICT_VOTES',
        'voteSkip': 'SKIPS',
        'voteFlag': 'FLAGS'
    }
};

test('vote-service', function(ttt) {
    var service;
    ttt.test(service = new VoteService(opts), function(tt) {
        tt.test('getFeatures', function(t){
            service.getFeatures(1, function(err, res) {
                t.ifError(err, 'getFeatures failed');
                t.ok(res, 'result returned');
                t.end();
            });
        });
        tt.test('fields', function(t) {
            t.equal(service.fields(), opts.voteFields, 'voteFields correct');
            t.end();
        });
    });
});
