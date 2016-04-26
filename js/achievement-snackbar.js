module.exports = AchievementSnackbar

function AchievementSnackbar (parentEl) {
  var snackbar = document.createElement('div')
  var title = document.createElement('div')
  var button = document.createElement('button')
  snackbar.className = 'mdl-js-snackbar mdl-snackbar'
  title.className = 'mdl-snackbar__text'
  button.className = 'mdl-snackbar__action'
  snackbar.appendChild(title)
  snackbar.appendChild(button)
  parentEl.appendChild(snackbar)
  this.snackbar = function () {
    return snackbar
  }
  this.showSnackbar = function (data) {
    snackbar.MaterialSnackbar.showSnackbar(data)
  }
}
