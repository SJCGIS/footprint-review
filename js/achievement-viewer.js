// requires Material Design Lite to already be loaded
// see https://github.com/google/material-design-lite/issues/833

var yo = require('yo-yo')
var queryString = require('query-string')
var componentHandler = require('mdlComponentHandler')
var dialogPolyfill = require('dialog-polyfill')
var Achievement = require('./achievement')
var socialNetworks = require('./config').socialNetworks

module.exports = AchievementViewer

function AchievementViewer (list, parentEl) {
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

  function update () {
    var newEl = render(self.achievements)
    yo.update(el, newEl)
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
    var card = document.createElement('div')
    var title = document.createElement('div')
    var menu = document.createElement('div')
    var subtitle = document.createElement('h2')
    var supportingText = document.createElement('div')
    card.className = achievement.opts.className
    card.className += ' achievement-card mdl-cell mdl-cell-4-col mdl-card mdl-shadow--4dp'
    title.className = 'mdl-card__title mdl-card--expand'
    subtitle.className = 'mdl-card__title-text'
    menu.className = 'mdl-card__menu'
    supportingText.className = 'mdl-card__supporting-text'
    subtitle.textContent = achievement.opts.title
    supportingText.textContent = achievement.opts.subtitle
    card.appendChild(title)
    card.appendChild(supportingText)
    title.appendChild(menu)
    title.appendChild(subtitle)
    menu.appendChild(mdlShareButton(achievement.opts.className + '--share'))
    menu.appendChild(mdlShareMenu(socialNetworks, achievement.opts.className + '--share'))
    return card
  }

  function mdlShareButton (id) {
    var button = document.createElement('button')
    var icon = document.createElement('i')
    icon.className = 'material-icons'
    icon.textContent = 'share'
    componentHandler.upgradeElement(button)
    button.className = 'mdl-button mdl-js-button mdl-button--icon'
    button.id = id
    button.appendChild(icon)
    return button
  }

  function mdlShareMenu (socialNetworks, buttonId) {
    var menu = document.createElement('ul')
    menu.className = 'mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
    menu.setAttribute('for', buttonId)
    socialNetworks.forEach(function (network) {
      var li = document.createElement('li')
      var a = document.createElement('a')
      li.className = 'mdl-menu__item'
      a.setAttribute('href', shareIntent(network))
      a.setAttribute('target', '_blank')
      a.textContent = network.name
      li.appendChild(a)
      menu.appendChild(li)
    })
    return menu
  }

  function shareIntent (network) {
    var qs = queryString.stringify(network.queryParams)
    var url = network.baseShare + '?' + qs
    return url
  }
}

AchievementViewer.prototype.checkAchievements = function () {
  this.achievements.forEach(function (achievement) {
    achievement.unlock()
  })
}
