var test = require('tape')
var Achievement = require('../js/achievement')
var achievements = require('./fixtures/achievements')

window.localStorage.setItem('cat', '2')
window.localStorage.setItem('robot', '0')
window.localStorage.setItem('world', 'evil')
window.localStorage.setItem('dog', 'woof')
window.localStorage.setItem('humanCard', 'true')

test('default achievement options', function (t) {
  var achievement = new Achievement(achievements[0].id, achievements[0].opts)
  t.notOk(achievement.runChallenge(), 'default challenge is bad')
  t.notOk(achievement.isUnlocked(), 'locked by default')
  achievement.unlock(function () {
    t.notOk(achievement.isUnlocked(), 'remains locked')
    t.notOk(window.localStorage.getItem('emptyCard'), 'achievement not added to localStorage')
  })
  t.end()
})

test('good number challenge', function (t) {
  var achievement = new Achievement(achievements[1].id, achievements[1].opts)
  achievement.on('achievement::unlocked', function (id) {
    t.equal(id, 'catCard', 'achievement emits unlocked event')
  })
  t.ok(achievement.runChallenge(), 'good challenge assigned')
  t.notOk(achievement.isUnlocked(), 'is initially locked')
  achievement.unlock(function () {
    t.ok(achievement.isUnlocked(), 'unlocked by good challenge')
    t.equal(window.localStorage.getItem('catCard'), 'true', 'achievement added to localStorage')
  })
  t.end()
})

test('bad number challenge', function (t) {
  var achievement = new Achievement(achievements[2].id, achievements[2].opts)
  t.notOk(achievement.runChallenge(), 'bad challenge is assigned')
  t.notOk(achievement.isUnlocked(), 'is initially locked')
  achievement.unlock(function () {
    t.notOk(achievement.isUnlocked(), 'remains locked')
    t.notOk(window.localStorage.getItem('robotCard'), 'achievement not added to localStorage')
  })
  t.end()
})

test('good string challenge', function (t) {
  var achievement = new Achievement(achievements[3].id, achievements[3].opts)
  t.notOk(achievement.isUnlocked(), 'is initially locked')
  achievement.on('achievement::unlocked', function (id) {
    t.equal(id, 'pandoraCard', 'achievement emits unlocked event')
  })
  t.ok(achievement.runChallenge(), 'good challenge assigned')
  achievement.unlock(function () {
    t.ok(achievement.isUnlocked(), 'unlocked by good challenge')
    t.equal(window.localStorage.getItem('pandoraCard'), 'true', 'achievement added to localStorage')
  })
  t.end()
})

test('bad string challenge', function (t) {
  var achievement = new Achievement(achievements[4].id, achievements[4].opts)
  t.notOk(achievement.runChallenge(), 'bad challenge is assigned')
  t.notOk(achievement.isUnlocked(), 'is initially locked')
  achievement.unlock(function () {
    t.notOk(achievement.isUnlocked(), 'remains locked')
    t.notOk(window.localStorage.getItem('dogCard'), 'achievement not added to localStorage')
  })
  t.end()
})

test('unlocked in localStorage', function (t) {
  var achievement = new Achievement(achievements[5].id, achievements[5].opts)
  t.ok(achievement.isUnlocked(), 'unlocked by being in localStorage')
  t.end()
})
