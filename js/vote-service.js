var events = require('events');
var Service = require('./service');
var inherits = require('inherits');

module.exports = VoteService;

function VoteService(opts) {
    var self = this;
    Service.call(this, opts);
    var voteFields = opts.voteFields || {};

    function incrementVote(fc, field) {
        var f = fc.features[0];
        f.properties[field] += 1;
        return f;
    }

    function updateData(fc, field, callback) {
        var f = incrementVote(fc, field);
        //TODO service is not in this scope
        //this.service.updateFeature(f, callback);
        return 'Update Data';
    }

    this.x = function() {
        return 3;
    };
    this.fields = function() {
        return voteFields;
    };
    this.addVote = function(oid, vote) {
        if(!(voteFields[vote])) throw new Error('Vote doesn\'t count');
        var field = voteFields[vote];
        this.getFeatures(oid, function(err, fc) {
            updateData(fc, field, self.emit('voteSubmission', field));
        });
    };
}

inherits(VoteService, Service);
