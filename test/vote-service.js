var test = require('tape');
var VoteService = require('../js/vote-service');

var opts = {
  url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/0',
  oId: 222,
  voteFields: {
    'voteSjc': 'SJC_VOTES',
    'votePict': 'PICT_VOTES',
    'voteSkip': 'SKIPS',
    'voteFlag': 'FLAGS'
  }
};

test('vote-service', function(ttt) {
  var service = new VoteService(opts);
  ttt.test('with oId specified' , function(tt) {
    tt.test('voteFields options', function(t) {
      t.equal(service.fields, opts.voteFields, 'voteFields set correctly');
      t.end();
    });
    tt.test('get random feature', function(t) {
      service.getRandomFeature(function(err, fc) {
        //t.ifError(err, 'no error');
        t.ok(fc, 'random feature received');
        t.end();
      });
    });
    tt.test('addVote', function(t) {
      service.on('vote-service::addVote', function(data) {
        t.ifError(data[0], 'no error');
        t.ok(data[1].success, 'vote successful');
        t.equal(data[1].objectId, 222, 'emits response');
        t.end();
      });
      service.addVote('voteSjc');
    });
  });
  // tt.test('emitter', function(t) {
  //   var res = 0;
  //   service.on('voteSubmitted', function() {
  //     res = 1;
  //   });
  //   service.addVote(212, 'voteSjc', function() {
  //     t.equal(res, 1, 'add vote emits successfully');
  //     t.end();
  //   });
  // });
});
