module.exports.achievements = [
  {
    id: 'newbie',
    opts: {
      title: 'Newbie',
      subtitle: 'Welcome aboard, kiddo. You\'ve reviewed at least ten footprints!',
      challenge: ['>=', 'voteTotal', 10],
      className: 'achievement-card__newbie'
    }
  }, {
    id: 'eager-beaver',
    opts: {
      title: 'Eager Beaver',
      subtitle: 'You\'ve reviewed 50 footprints! Are you gonna stop now? Gnaw.',
      challenge: ['>=', 'voteTotal', 50],
      className: 'achievement-card__eager-beaver'
    }
  }, {
    id: 'registered-voter',
    opts: {
      title: 'Registered Voter',
      subtitle: 'Throw a political party! You\'ve reviewed over 100 footprints!',
      challenge: ['>', 'voteTotal', 100],
      className: 'achievement-card__registered-voter'
    }
  }, {
    id: 'house-flipper',
    opts: {
      title: 'House Flipper',
      subtitle: 'You\'re a master of redevelopment! You\'ve reviewed over 200 footprints!',
      challenge: ['>', 'voteTotal', 200],
      className: 'achievement-card__house-flipper'
    }
  }, {
    id: 'eagle-eye',
    opts: {
      title: 'Eagle Eye',
      subtitle: 'Way to go, hotshot! You\'ve reviewed over 1000 footprints!',
      challenge: ['>', 'voteTotal', 1000],
      className: 'achievement-card__eagle-eye'
    }
  }, {
    id: 'inspector-detector',
    opts: {
      title: 'Inspector Detector',
      subtitle: 'Congratulations, detective! You\'ve reviewed over 2000 footprints!',
      challenge: ['>', 'voteTotal', 2000],
      className: 'achievement-card__inspector-detector'
    }
  }, {
    id: 'house-hunter',
    opts: {
      title: 'House Hunter',
      subtitle: 'You\'ve reviewed over 4000 footprints! Find a favorite yet?',
      challenge: ['>', 'voteTotal', 4000],
      className: 'achievement-card__house-hunter'
    }
  }
]

module.exports.socialNetworks = [
  {
    name: 'Twitter',
    baseShare: 'https://twitter.com/intent/tweet',
    queryParams: {
      text: 'I just unlocked a new achievement on Footprint Review!',
      url: 'http://sjcgis.org/footprint-review',
      related: '@npeihl'
    }
  }, {
    name: 'Facebook',
    baseShare: 'https://www.facebook.com/dialog/feed',
    queryParams: {
      appId: '241631472856853',
      link: 'http://sjcgis.org/footprint-review',
      display: 'page'
    }
  }
]
