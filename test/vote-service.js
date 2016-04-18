var test = require('tape')
var VoteService = require('../js/vote-service')

var opts = {
  url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare_test/FeatureServer/0',
  oId: 222,
  voteFields: {
    'voteSjc': 'SJC_VOTES',
    'votePict': 'PICT_VOTES',
    'voteSkip': 'SKIPS',
    'voteFlag': 'FLAGS'
  }
}

test('vote-service', function (ttt) {
  var service = new VoteService(opts)
  ttt.test('with oId specified', function (tt) {
    tt.test('voteFields options', function (t) {
      t.equal(service.voteFields, opts.voteFields, 'voteFields set correctly')
      t.end()
    })
    tt.test('get random feature', function (t) {
      service.getRandomFeature(function (err, fc) {
        t.ifError(err, 'no error')
        t.ok(fc, 'random feature received')
        t.end()
      })
    })
    tt.test('addVote', function (t) {
      service.on('vote-service::saveVote', function (res) {
        t.ok(res.success, 'successfully saved')
        t.equal(res.objectId, 222, 'emits correct Object ID')
      })
      service.on('vote-service::addVote', function (vote) {
        t.equal(vote, 'voteSjc', 'emits correct response')
        t.end()
      })
      service.addVote('voteSjc')
    })
  })
})
