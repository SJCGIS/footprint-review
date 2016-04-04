var test = require('tape');
var Store = require('../js/storage');

window.localStorage.clear();
window.localStorage.setItem('totalVotes', 500);
window.localStorage.setItem('voteSjc', 125);
window.localStorage.setItem('votePict', 125);
window.localStorage.setItem('voteFlag', 125);
window.localStorage.setItem('voteSkip', 125);


var st = Store('migrated-storage', function(err, store) {
    return done(store);
});

function done(store) {
    test('storage migration' , function(t) {
        store.length(function(err, len) {
            t.ifError(err, 'no length error');
            t.equal(len, 5, 'store length correct');
            t.end();
        });
    });
}
