// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
//const {ipcRenderer} = require('electron')
var test = require('./data/test.json')

/**
 * show next image
 */
function showNextImg() {
  var imgEl = document.querySelector('#main')
  var imgSrc = imgEl.src

  var currentIndex = null
  for (var i = 0; i < test.length; i++) {
    var t = test[i]
    if (t.playlist_item && t.playlist_item === imgSrc) {
      currentIndex = i
    }
  }

  if (currentIndex !== null) {
    var nextIndex = (currentIndex + 1) % test.length
    var url = test[nextIndex]['playlist_item']
  } else {
    var url = test[0]['playlist_item']
  }

  if (url && imgEl && imgEl.src && imgEl.src !== url ) {
    imgEl.src = url
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode === 78 || e.keyCode === 32) {
    console.log('next')
    showNextImg()
  }
})
