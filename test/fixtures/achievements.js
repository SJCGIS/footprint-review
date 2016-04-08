module.exports = [
    {
        id: 'a1',
        opts: {}
    }, {
        id: 'a2',
        opts: {
            title: 'Cat Acquired',
            subtitle: 'You have adopted a cat',
            challenge: ['>=', 'cat', 1]
        }
    }, {
        id: 'a3',
        opts: {
            title: 'I am a robot',
            subtitle: 'beep boop',
            challenge: ['==', 'robot', 1]
        }
    }, {
        id: 'a4',
        opts: {
            title: 'Pandora\'s Box',
            subtitle: 'The box has been opened',
            challenge: ['==', 'world', 'evil']
        }
    }, {
        id: 'a5',
        opts: {
            title: 'Dog',
            subtitle: 'The dog woofed',
            challenge: ['==', 'dog', 'bark']
        }
    }, {
        id: 'a6',
        opts: {
            title: 'Human Being',
            subtitle: 'You were born!',
            challenge: ['==', 'human', 'born']
        }
    }
];
