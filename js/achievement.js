var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var ff = require('feature-filter')

module.exports = Achievement

/**
 * This function creates an achievement with a defined goal that can
 be unlocked by a key in localStorage
 * @param {string} id achievement id that is unique to localStorage keys
 * @param {Object} opts options that define the achievement
 * @param {string} opts.title achievement title
 * @param {string} opts.subtitle supporting text for achievement
 * @param {string} opts.className CSS selector class for achievement
 * @example
 * var achievement = new Achievement('robot', {
 * title: 'Robot',
 * subtitle: 'Beep Boop',
 *className: 'achievement-card__robot'
 * })
 */
function Achievement (id, opts) {
  if (!(this instanceof Achievement)) return new Achievement(id, opts)
  EventEmitter.call(this)
  if (!opts) opts = {}

  this.id = id

  this.opts = {
    title: opts.title || 'New Achievement',
    subtitle: opts.subtitle || '',
    className: opts.className || 'achievement-card__default'
  }

  var self = this
  var challenge = opts.challenge || ['==', 0, 1]
  var filter = ff(challenge)
  var locked = true // locked by default
  if (window.localStorage.getItem(this.id) !== null ||
      opts.locked === false) {
    locked = false
  }

  var store = function () {
    window.localStorage.setItem(self.id, String(self.isUnlocked()))
  }

  /**
   * This function checks if the achievement can be unlocked by the
   value in localStorage
   * @returns {boolean} challenge is unlockable
   */
  this.runChallenge = function () {
    var k = String(challenge[1])
    var vStr = window.localStorage.getItem(k)
    var v = isNaN(parseInt(vStr, 10)) ? vStr : parseInt(vStr, 10)
    var props = {}
    props[k] = v
    return filter({properties: props})
  }
  /**
   * This function unlocks the achievement if it's not already unlocked
   and if it can be unlocked. If successfully unlocked the achievement is
   added to localStorage and emits an event
   */
  this.isUnlocked = function () {
    return !locked
  }

  this.unlock = function () {
    if (!this.isUnlocked() && this.runChallenge()) {
      locked = false
      store()
      self.emit('achievement::unlocked', self.id)
    }
  }
}

inherits(Achievement, EventEmitter)
