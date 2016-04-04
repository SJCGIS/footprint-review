var test = require('tape');
var Store = require('../js/storage');

window.localStorage.clear();

var st = new Store('empty-storage', function(err, store) {
    return done(store);
});

function done(store) {
    test('empty store', function(t) {
        store.length(function(err, len) {
            t.ifError(err, 'no length error');
            t.notOk(len, 'no length returned');
            t.end();
        });
    });
}
