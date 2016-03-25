var Review = require('./js/review');
var VoteService = require('./js/vote-service');
var Service = require('./js/service');

// var app = new Review();
// app.getNewLocation(1,18772);


var fpService = new VoteService({
    url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/0',
    token: 'SY0mQwJef4qWQC0REq5uoHGLscS5TKLKx8kolbf9WoqhltWVd8lo4AtbbxUqc3kKpvHQ_Dx5Umz_CJekF1z5fkpxosVJ-QeKtQSSTBa9SfrwoP7fmIgeiZDh16zharIv',
    voteFields: {
        'voteSjc': 'SJC_VOTES',
        'votePict': 'PICT_VOTES',
        'voteSkip': 'SKIPS',
        'voteFlag': 'FLAGS'
    }
});

fpService.on('voteSubmission', function(e) {
    console.log('Event: ', e);
});

fpService.addVote(212, 'voteSjc');
