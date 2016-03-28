var VoteService = require('./js/vote-service');
var Service = require('./js/service');

// (function() {
//   var fpService = new VoteService({
//     url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/0',
//     token: 'SY0mQwJef4qWQC0REq5uoHGLscS5TKLKx8kolbf9WoqhltWVd8lo4AtbbxUqc3kKpvHQ_Dx5Umz_CJekF1z5fkpxosVJ-QeKtQSSTBa9SfrwoP7fmIgeiZDh16zharIv',
//     voteFields: {
//       'voteSjc': 'SJC_VOTES',
//       'votePict': 'PICT_VOTES',
//       'voteSkip': 'SKIPS',
//       'voteFlag': 'FLAGS'
//     }
//   });
// })();


var fpService = new VoteService({
  url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/0',
  oId: 222,
  voteFields: {
    'voteSjc': 'SJC_VOTES',
    'votePict': 'PICT_VOTES',
    'voteSkip': 'SKIPS',
    'voteFlag': 'FLAGS'
  }
});

fpService.addVote('voteSjc');
