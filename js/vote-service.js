var events = require('events');
var Service = require('./service');
var inherits = require('inherits');

module.exports = VoteService;

function VoteService(opts) {
    var self = this;
    Service.call(this, opts);
    var voteFields = opts.voteFields || {};
    var fpIdFields = opts.fpIdFields || {};
    var min = opts.min || 0;
    var max = opts.max || 1000;
    var oId = opts.oId;

    this.incrementVote = function(fc, field) {
        var f = fc.features[0];
        delete f.geometry;
        f.properties[field] += 1;
        return f;
    };

    function saveVote(vote, callback) {
        var field = voteFields[vote];
        self.getFeatures(function(err, fc) {
            self.service().updateFeature(self.incrementVote(fc, field), callback);
        });
    }

    this.getRandomId = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.oId = function() {
        return oId || this.getRandomId(min, max);
    };

    this.addVote = function(vote) {
        saveVote(vote, function(err, res) {
            if (err) throw err;
            self.emit('vote-service::addVote', vote);
            self.emit('vote-service::saveVote', res);
        });
    };

    this.voteFields = voteFields;

    this.fpIdFields = fpIdFields;
}

inherits(VoteService, Service);

VoteService.prototype.getRandomFeature = function(callback) {
    this.setoId(this.getRandomId);
    this.getFeatures(callback);
};
