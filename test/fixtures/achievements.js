module.exports = [
    {
        id: 'emptyCard',
        opts: {}
    }, {
        id: 'catCard',
        opts: {
            title: 'Cat Acquired',
            subtitle: 'You have adopted a cat',
            challenge: ['>=', 'cat', 1]
        }
    }, {
        id: 'robotCard',
        opts: {
            title: 'I am a robot',
            subtitle: 'beep boop',
            challenge: ['==', 'robot', 1]
        }
    }, {
        id: 'pandoraCard',
        opts: {
            title: 'Pandora\'s Box',
            subtitle: 'The box has been opened',
            challenge: ['==', 'world', 'evil']
        }
    }, {
        id: 'dogCard',
        opts: {
            title: 'Dog',
            subtitle: 'The dog woofed',
            challenge: ['==', 'dog', 'bark']
        }
    }, {
        id: 'humanCard',
        opts: {
            title: 'Human Being',
            subtitle: 'You were born!',
            challenge: ['==', 'human', 'born']
        }
    }
];
