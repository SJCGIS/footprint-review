var yo = require('yo-yo');
var csjs = require('csjs');
var dialogPolyfill = require('dialog-polyfill');
var Achievement = require('./achievement');

module.exports = AchievementViewer;

function AchievementViewer(achievements) {
    this.achievements = achievements.map(function(item) {
        return new Achievement(item.id, item.opts);
    });

    var el = render(this.achievements);
    el.querySelector('.close').addEventListener('click', function() {
        el.close();
    });
    if (!el.showModal) dialogPolyfill.registerDialog(el);
    return el;

    function render(achievements) {
        return yo`
<dialog class="achievementsDialog mdl-dialog">
<h4 class="mdl-dialog__title">Achievements</h4>
<div class="mdl-dialog__content">
${gridify(achievements, 3).map(function(card) {
return card;
})}
</div>
<div class="mdl-dialog__actions">
<button type="button" class="mdl-button close">Close</button>
</div>
</dialog>`;
    };

    function gridify(array, chunkSize) {
        var grids = [];
        var unlockedCards = array.filter(function(item) {
            return item.isUnlocked();
        });

        unlockedCards.map(function(n, i) {
            if (i%chunkSize === 0) {
                grids.push(unlockedCards.slice(i, i+chunkSize));
            }
        });
        var el = grids.map(function(cards) {
            return yo`
<div class="mdl-grid">
${cards.map(function(card) {
return cardify(card);
})}
</div>
`;
        });
        return el;
    }

    function cardify(achievement) {
        return yo`
<div class="${styles.achievementCard} mdl-cell mdl-cell-4-col mdl-card mdl-shadow--4dp">
<div class="mdl-card__title">
<h2 class="mdl-card__title-text">${achievement.opts.title}</h2>
</div>
<div class="mdl-card__supporting-text">
${achievement.opts.subtitle}
</div>
</div>
`;

    }
}

var styles = module.exports.styles = csjs`
.achievementsDialog {
width: 75%;
}
.achievementCard.mdl-card {
width: 320px;
height: 320px;
}
.achievementCard > .mdl-card__title {
background: #white
`;
