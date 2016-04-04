var test = require('tape');
var Store = require('../js/storage');

var st = new Store('existing-storage', function(err, store) {
    store.setItem('totalVotes', 500, done);
});

function done() {
    test('up vote' , function(t) {
        st.upVote('totalVotes', function(err, val){
            t.ifError(err, 'no error');
            t.equal(val, 501, 'up vote successful');
            t.end();
        });

    });

    test('get vote', function(t) {
        st.getVote('totalVotes', function(err, val) {
            t.ifError(err, 'no error');
            t.equal(val, 501, 'get vote successful');
            t.end();
        });

    });
}
