var localForage = require('localforage');
var hasLocalStorage = require('has-localstorage');

module.exports = Store;

function Store(name, callback) {
    if (!(this instanceof Store)) return new Store(name, callback);

    var store = localForage.createInstance({
        name: name,
        description: 'Used for logging vote counts. Future storage uses expected.',
        version: 1.0
    });

    store.length(function(err, len) {
        if(!(len) && hasLocalStorage() && localStorage.length > 0) {
            migrateStorage(function() {
                console.log('Votes migrated');
            });
        }
        callback(err, store);
    });

    var migrateStorage = function(callback) {
        console.log('Migrating storage ...');
        var remainingTasks = localStorage.length;

        if (remainingTasks === 0) {
            callback();
        } else {
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                store.setItem(key, localStorage.getItem(key), function() {
                    console.log('Migrating ', key, localStorage.getItem(key), arguments);
                    if (--remainingTasks === 0) {
                        callback();
                    }
                });
            }
        };
    };
    this.upVote = function(vote, callback) {
        var value;
        this.getVote(vote, function(err, val) {
            if (err) throw err;
            value = parseInt(val) + 1 || 1;
            store.setItem(vote, value, function(err, val){
                callback(err, val);
            });
        });
    };
    this.getVote = function(vote, callback) {
        store.getItem(vote, function(err, val) {
            callback(err, val);
        });
    };
    this.getVotes = function(callback) {
        var registry = {};
        store.iterate(function(v,k,i) {
            registry.k = v;
        }, function(res) {
            console.log(arguments);
        });
    };
}
