// Get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('#fullscreen')

// Build our functions
function togglePlay() {
  video[video.paused ? 'play' : 'pause']()
}

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚'
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = e.offsetX / progress.offsetWidth * video.duration
  video.currentTime = scrubTime
}

function toggleFullScreen() {
  if ((document.fullScreenElement && document.fullScreenElement !== null) ||
    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if (player.requestFullScreen) {
      player.requestFullScreen()
    } else if (player.mozRequestFullScreen) {
      player.mozRequestFullScreen()
    } else if (player.webkitRequestFullScreen) {
      console.log('webkit fullscreen')
      player.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }
  player.classList.toggle('full')
}

// Hook up the event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

progress.addEventListener('click', scrub)

let mousedown = false
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)

toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))

fullScreen.addEventListener('click', e => toggleFullScreen(e))

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
