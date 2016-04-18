module.exports.achievements = [
  {
    id: 'newbie',
    opts: {
      title: 'Newbie',
      subtitle: 'Welcome aboard, kiddo. You\'ve reviewed at least ten footprints!',
      challenge: ['>=', 'totalVotes', 10],
      className: 'achievement-card__newbie'
    }
  }, {
    id: 'registered-voter',
    opts: {
      title: 'Registered Voter',
      subtitle: 'Throw a political party! You\'ve reviewed over 100 footprints!',
      challenge: ['>', 'totalVotes', 100],
      className: 'achievement-card__registered-voter'
    }
  }, {
    id: 'eagle-eye',
    opts: {
      title: 'Eagle Eye',
      subtitle: 'Way to go, hotshot! You\'ve reviewed over 1000 footprints!',
      challenge: ['>', 'totalVotes', 1000],
      className: 'achievement-card__eagle-eye'
    }
  }, {
    id: 'inspector-detector',
    opts: {
      title: 'Inspector Detector',
      subtitle: 'Congratulations, detective! You\'ve reviewed over 2000 footprints!',
      challenge: ['>', 'totalVotes', 2000],
      className: 'achievement-card__inspector-detector'
    }
  }, {
    id: 'house-hunter',
    opts: {
      title: 'House Hunter',
      subtitle: 'You\'ve reviewed over 4000 footprints! Find a favorite yet?',
      challenge: ['>', 'totalVotes', 4000],
      className: 'achievement-card__house-hunter'
    }
  }
]
