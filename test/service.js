var test = require('tape');
var Service = require('../js/service');

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

test('service', function(ttt) {
  var service = new Service(opts);
  ttt.test('service with defined oId', function(tt) {
    tt.test('getFeatures', function(t){
      service.getFeatures(function(err, res) {
        console.log(arguments);
        t.ifError(err, 'no error');
        t.equal(res.features[0].id, 222, 'correct object id returned');
        t.end();
      });
    });
    tt.test('assigned oId', function(t) {
      t.equal(service.oId(), 222, 'assigned oId correct');
      t.end();
    });
    tt.test('set oId', function(t) {
      service.on('service::oIdChange', function(id) {
        t.equal(id, 223, 'new-oId event emitted');
      });
      service.setoId(223);
      t.equal(service.oId(), 223, 'new oId assigned correctly');
      t.end();
    });
  });
});
