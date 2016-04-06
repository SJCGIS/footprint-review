var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits');
var ff = require('feature-filter');

module.exports = Achievement;

function Achievement(id, opts) {
    if (!(this instanceof Achievement)) return new Achievement(id, opts);
    EventEmitter.call(this);
    if (!opts) opts = {};

    this.id = id;

    this.opts = {
        title: opts.title || 'New Achievement',
        subtitle: opts.subtitle || '',
        background: opts.background || "#3E4EB8"
    };

    var self = this;
    var challenge = opts.challenge || ['==', 0, 1];
    var filter = ff(challenge);
    var locked = true; //locked by default
    if (localStorage.getItem(this.id) !== null) locked = false; //unlocked if in localStorage

    var store = function() {
        localStorage.setItem(self.id, String(self.isUnlocked()));
    };

    this.runChallenge = function(e) {
        var k = String(challenge[1]);
        var vStr = localStorage.getItem(k);
        var v = isNaN(parseInt(vStr, 10)) ? vStr : parseInt(vStr, 10);
        var props = {};
        props[k] = v;
        return filter({properties: props});
    };

    this.isUnlocked = function() {
        return !locked;
    };

    this.unlock = function(callback) {
        if (!this.isUnlocked() && this.runChallenge()) {
            locked = false;
            store();
            self.emit('achievement::unlocked', self.id);
        }
        callback();
    };
}

inherits(Achievement, EventEmitter);
