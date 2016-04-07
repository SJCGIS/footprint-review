var test = require('tape');
var config = require('../js/config');
var AchievementViewer = require('../js/achievement-viewer');

var achievements = config.achievements;

test('sanity', function(t) {
    var viewer = new AchievementViewer(achievements);
    t.ok(viewer, 'Viewer constructed');
    t.end();
});
