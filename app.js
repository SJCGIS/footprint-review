/* global ga */

var dialogPolyfill = require('dialog-polyfill')
var VoteService = require('./js/vote-service')
var Service = require('./js/service')
var FootprintMap = require('./js/map')
var config = require('./js/config')
var AchievementViewer = require('./js/achievement-viewer')
var AchievementSnackbar = require('./js/achievement-snackbar')

App()

function App () {
  if (!(this instanceof App)) return new App()
  var body = document.body
  var achievementViewer = new AchievementViewer(config.achievements, body)
  var achievementSnackbar = new AchievementSnackbar(body)

  var helpDialog = initHelpDialog()
  helpDialog.showModal()

  var achievementNav = document.getElementById('achievement-nav')
  achievementNav.addEventListener('click', function (e) {
    e.preventDefault()
    achievementViewer.el().showModal()
    ga('send', 'event', 'achievement', 'view-nav')
  })

  var achievementDrawer = document.getElementById('achievement-drawer')
  achievementDrawer.addEventListener('click', function (e) {
    e.preventDefault()
    achievementViewer.el().showModal()
    ga('send', 'event', 'achievement', 'view-drawer')
  })

  var map1 = new FootprintMap({
    mapId: 'map1'
  })
  var map2 = new FootprintMap({
    mapId: 'map2'
  })

  var sjcFootprint = new Service({
    url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/1',
    proxy: '/proxy/proxy.ashx'
  })
  var pictFootprint = new Service({
    url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/2',
    proxy: '/proxy/proxy.ashx'
  })

  var fpService = new VoteService({
    url: 'http://services.arcgis.com/PNkCg7xWnaf90qde/arcgis/rest/services/Footprint_Compare/FeatureServer/0',
    proxy: '/proxy/proxy.ashx',
    min: 0,
    max: 18772,
    voteFields: {
      'voteSjc': 'SJC_VOTES',
      'votePict': 'PICT_VOTES',
      'voteSkip': 'SKIPS',
      'voteFlag': 'FLAGS'
    },
    fpIdFields: {
      'sjc': 'SJC_Footprints_OBJECTID',
      'pict': 'PICT_Footprints_OBJECTID'
    }
  })

  var buttons = document.querySelectorAll('.vote-button')
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function (e) {
      disableVoting()
      fpService.addVote(e.target.name)
    })
  }

  achievementViewer.on('achievementViewer::newAchievements', function () {
    achievementSnackbar.showSnackbar({
      message: 'New achievement unlocked!',
      actionHandler: function () {
        achievementViewer.el().showModal()
      },
      actionText: 'Show'
    })
    ga('send', 'event', 'achievement', 'unlocked')
  })

  sjcFootprint.on('service::oIdChange', function (id) {
    sjcFootprint.getFeatures(function (err, fc) {
      if (err) handleError(err, 'sjcFootprint.getFeatures')
      map1.addGeojson(fc)
    })
  })

  pictFootprint.on('service::oIdChange', function (id) {
    pictFootprint.getFeatures(function (err, fc) {
      if (err) handleError(err, 'pictFootprint.getFeatures')
      map2.addGeojson(fc)
    })
  })

  fpService.on('vote-service::addVote', function (vote) {
    upVoteLocalStorage(vote)
    upVoteLocalStorage('voteTotal')
    ga('send', 'event', 'vote', vote)
    achievementViewer.checkAchievements()
    getNew()
  })

  fpService.on('vote-service::saveVote', function (res) {
    if (res.success) {
      window.localStorage.setItem('lastId', res.objectId)
    }
  })

  function handleError (err, callee) {
    var errorDialog = document.getElementById('error-dialog')
    if (!errorDialog.showModal) {
      dialogPolyfill.registerDialog(errorDialog)
    }
    var errButtons = errorDialog.querySelectorAll('.mdl-button')
    for (var i = 0; i < errButtons.length; i++) {
      errButtons[i].addEventListener('click', function (e) {
        handleErrorAction(e.target.id, err)
      })
    }
    errorDialog.showModal()
    ga('send', 'event', 'error', callee, err.code, err.message)
  }

  function handleErrorAction (id, err) {
    switch (id) {
      case 'err-reload':
        window.location.reload()
        break
      case 'err-report':
        reportError(err)
        break
      default:
        break
    }
  }

  function reportError (err) {
    var email = 'sjcgis@sanjuanco.com'
    var subject = 'Footprint Review Error Report'
    var body = 'This is an automatically generated error report from Footprint Review\r\n'
    body += '\r\n'
    body += 'Error Code: ' + err.code + '\r\n'
    body += 'Error Message: ' + err.message
    var href = encodeURI('mailto://' + email + '?subject=' + subject + '&body=' + body)
    window.location = href
  }

  function initHelpDialog () {
    var helpDialog = document.getElementById('help-dialog')
    if (!helpDialog.showModal) {
      dialogPolyfill.registerDialog(helpDialog)
    }

    helpDialog.querySelector('.close').addEventListener('click', function (e) {
      helpDialog.close()
    })

    var helpNav = document.getElementById('help-nav')
    helpNav.addEventListener('click', function (e) {
      e.preventDefault()
      helpDialog.showModal()
      ga('send', 'event', 'help', 'view-nav')
    })

    var helpDrawer = document.getElementById('help-drawer')
    helpDrawer.addEventListener('click', function (e) {
      e.preventDefault()
      helpDialog.showModal()
      ga('send', 'event', 'help', 'view-drawer')
    })
    return helpDialog
  }

  var disableVoting = function () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true
    }
  }

  var enableVoting = function () {
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = false
    }
  }

  var upVoteLocalStorage = function (item) {
    var pVal = window.localStorage.getItem(item) || 0
    window.localStorage.setItem(item, parseInt(pVal) + 1)
  }

  var getNew = function () {
    fpService.getRandomFeature(function (err, fc) {
      if (err) handleError(err, 'fpService.getRandomFeature')
      var coords = fc.features[0].geometry.coordinates
      map1.zoomTo([coords[1], coords[0]], 19)
      map2.zoomTo([coords[1], coords[0]], 19)
      sjcFootprint.setoId(fc.features[0].properties[fpService.fpIdFields['sjc']])
      pictFootprint.setoId(fc.features[0].properties[fpService.fpIdFields['pict']])
      enableVoting()
    })
  }
  return getNew()
}
