module.exports.achievements = [
  {
    id: 'newbie',
    opts: {
      title: 'Newbie',
      subtitle: 'You\'ve reviewed at least ten footprints!',
      challenge: ['>=', 'totalVotes', 10],
      className: 'achievement-card__newbie'
    }
  },
  {
    id: 'registered-voter',
    opts: {
      title: 'Registered Voter',
      subtitle: 'You\'ve reviewed over 100 footprints!',
      challenge: ['>', 'totalVotes', 100]
    }
  }
]
