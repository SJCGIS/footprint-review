// requires Material Design Lite to already be loaded
// see https://github.com/google/material-design-lite/issues/833

var yo = require('yo-yo')
var queryString = require('query-string')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')
var componentHandler = require('mdlComponentHandler')
var dialogPolyfill = require('dialog-polyfill')
var Achievement = require('./achievement')
var socialNetworks = require('./config').socialNetworks

module.exports = AchievementViewer

function AchievementViewer (list, parentEl) {
  EventEmitter.call(this)
  var self = this

  this.achievements = list.map(function (item) {
    var achievement = new Achievement(item.id, item.opts)
    achievement.unlock()
    achievement.on('achievement::unlocked', function (e) {
      update()
    })
    return achievement
  })

  var el = render(this.achievements)
  el.querySelector('.close').addEventListener('click', function () {
    el.close()
  })
  if (!el.showModal) dialogPolyfill.registerDialog(el)
  parentEl.appendChild(el)

  this.el = function () {
    return el
  }

  this.checkAchievements = function () {
    this.achievements.forEach(function (achievement) {
      achievement.unlock()
    })
  }

  function update () {
    var newEl = render(self.achievements)
    yo.update(el, newEl)
    componentHandler.upgradeAllRegistered()
    self.emit('achievementViewer::newAchievements')
  }

  function render (achievements) {
    return yo`
<dialog class="achievement-dialog mdl-dialog">
<h4 class="mdl-dialog__title">Achievements</h4>
<div class="mdl-dialog__content">
${gridify(achievements)}
</div>
<div class="mdl-dialog__actions">
<button type="button" class="mdl-button close">Close</button>
</div>
</dialog>`
  }

  function gridify (array) {
    var unlockedCards = array.filter(function (item) {
      return item.isUnlocked()
    })
    var grid = document.createElement('div')
    grid.className = 'mdl-grid'
    unlockedCards.map(function (card) {
      grid.appendChild(cardify(card))
    })
    return grid
  }

  function cardify (achievement) {
    var shareButton = mdlShareButton(achievement.opts.className + '--share')
    var shareMenu = mdlShareMenu(socialNetworks, achievement.opts.className + '--share')
    var card = yo`
<div class='${achievement.opts.className} achievement-card mdl-cell mdl-cell-4-col mdl-card mdl-shadow--4dp'>
<div class='mdl-card__title mdl-card--expand'>
<h2 class='mdl-card__title-text'>${achievement.opts.title}</h2>
</div>
<div class='mdl-card__supporting-text'>
${achievement.opts.subtitle}
</div>
</div>
`
    componentHandler.upgradeElements([shareButton, shareMenu])
    return card
  }

  function mdlShareButton (id) {
    var button =  yo`
<button id='${id}' class='mdl-button mdl-js-button mdl-button--icon'>
<i class='material-icons'>share</i>
</button>
`
    //componentHandler.upgradeElement(button)
    return button
  }

  function mdlShareMenu (socialNetworks, buttonId) {
    var items = []
    socialNetworks.forEach(function (network) {
      items.push(yo`
<li class='mdl-menu__item'>${network.name}</li>
`)
    })
    var menu = yo`
<ul class='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'>
${items}
</ul>
`
    return menu
  }

  function shareIntent (network) {
    var qs = queryString.stringify(network.queryParams)
    var url = network.baseShare + '?' + qs
    return url
  }
}

inherits(AchievementViewer, EventEmitter)
