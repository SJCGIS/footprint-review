var test = require('tape');
var Store = require('../js/storage');

localStorage.clear();
localStorage.setItem('totalVotes', 500);
localStorage.setItem('voteSjc', 125);
localStorage.setItem('votePict', 125);
localStorage.setItem('voteFlag', 125);
localStorage.setItem('voteSkip', 125);


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
