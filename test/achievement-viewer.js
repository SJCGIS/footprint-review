var test = require('tape');
var AchievementViewer = require('../js/achievement-viewer');
var achievements = require('./fixtures/achievements');

var parentEl = document.createElement('div');
localStorage.clear();
localStorage.setItem('a6', 'true');

test('init AchievementViewer', function(t) {
    var viewer = new AchievementViewer(achievements, parentEl);
    var unlockedCards = viewer.el().querySelectorAll('.mdl-card');
    t.ok(viewer, 'Viewer constructed');
    t.equal(unlockedCards.length, 1, 'one card unlocked');
    t.end();
});

test('unlock achievement', function(t) {
    var viewer = new AchievementViewer(achievements, parentEl);
    localStorage.setItem('cat', '1');
    viewer.achievements[1].unlock(function() {
        var unlockedCards = viewer.el().querySelectorAll('.mdl-card');
        t.equal(unlockedCards.length, 4, 'new card unlocked');
        t.end();
    });
});
