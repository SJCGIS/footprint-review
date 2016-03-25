var test = require('tape');
var Service = require('../js/service');

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

test('service', function(t) {
    new Service(opts).getFeatures(1, function(err, res) {
        t.ifError(err);
        t.ok(res);
        t.end();
    });
});
