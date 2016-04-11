var test = require('tape');
var AchievementViewer = require('../js/achievement-viewer');
var achievements = require('./fixtures/achievements');

var parentEl = document.createElement('div');

test('init AchievementViewer', function(t) {
    var viewer = new AchievementViewer(achievements, parentEl);
    var unlockedCards = viewer.el().querySelectorAll('.mdl-card');
    t.ok(viewer, 'Viewer constructed');
    t.equal(unlockedCards.length, 3, 'three cards unlocked');
    t.end();
});

test('unlock achievement', function(t) {
    var viewer = new AchievementViewer(achievements, parentEl);
    localStorage.setItem('robot', '1');
    viewer.achievements[2].unlock(function() {
        var unlockedCards = viewer.el().querySelectorAll('.mdl-card');
        t.equal(unlockedCards.length, 4, 'new card unlocked');
        t.end();
    });
});
