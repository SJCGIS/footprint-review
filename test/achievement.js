var test = require('tape');
var Achievement = require('../js/achievement');

localStorage.clear();
localStorage.setItem('test2', '2');
localStorage.setItem('test3', '3');
localStorage.setItem('test4', 'frog');
localStorage.setItem('test5', 'rabbit');
localStorage.setItem('a6', 'true');


test('default achievement options', function(t) {
    var achievement = new Achievement('a1');
    t.notOk(achievement.runChallenge(), 'default challenge is bad');
    t.notOk(achievement.isUnlocked(), 'locked by default');
    achievement.unlock(function() {
        t.notOk(achievement.isUnlocked(), 'remains locked');
        t.notOk(localStorage.getItem('a1'), 'achievement not added to localStorage');
    });
    t.end();
});

test('good number challenge', function(t) {
    var achievement = new Achievement('a2', {
        challenge: [">", 'test2', 1]
    });
    achievement.on('achievement::unlocked', function(id) {
        t.equal(id, 'a2', 'achievement emits unlocked event');
    });
    t.ok(achievement.runChallenge(), 'good challenge assigned');
    t.notOk(achievement.isUnlocked(),'is initially locked');
    achievement.unlock(function() {
        t.ok(achievement.isUnlocked(), 'unlocked by good challenge');
        t.equal(localStorage.getItem('a2'), "true", 'achievement added to localStorage');
    });
    t.end();

});

test('bad number challenge', function(t) {
    var achievement = new Achievement('a3', {
        challenge: ["<", 'test3', 2]
    });
    t.notOk(achievement.runChallenge(), 'bad challenge is assigned');
    t.notOk(achievement.isUnlocked(), 'is initially locked');
    achievement.unlock(function() {
        t.notOk(achievement.isUnlocked(), 'remains locked');
        t.notOk(localStorage.getItem('a3'), 'achievement not added to localStorage');
    });
    t.end();
});

test('good string challenge', function(t) {
    var achievement = new Achievement('a4', {
        challenge: ["==", 'test4', 'frog']
    });
    t.notOk(achievement.isUnlocked(),'is initially locked');
    achievement.on('achievement::unlocked', function(id) {
        t.equal(id, 'a4', 'achievement emits unlocked event');
    });
    t.ok(achievement.runChallenge(), 'good challenge assigned');
    achievement.unlock(function() {
        t.ok(achievement.isUnlocked(), 'unlocked by good challenge');
        t.equal(localStorage.getItem('a4'), "true", 'achievement added to localStorage');
    });
    t.end();

});

test('bad string challenge', function(t) {
    var achievement = new Achievement('a5', {
        challenge: ["==", 'test5', 'lizard']
    });
    t.notOk(achievement.runChallenge(), 'bad challenge is assigned');
    t.notOk(achievement.isUnlocked(), 'is initially locked');
    achievement.unlock(function() {
        t.notOk(achievement.isUnlocked(), 'remains locked');
        t.notOk(localStorage.getItem('a5'), 'achievement not added to localStorage');
    });
    t.end();
});

test('unlocked in localStorage', function(t) {
    var achievement = new Achievement('a6');
    t.ok(achievement.isUnlocked(), 'unlocked by being in localStorage');
    t.end();
});
