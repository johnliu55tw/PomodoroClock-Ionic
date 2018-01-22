import document from 'document'
import * as utils from '../common/utils.js'
import {PomoIntvlState, PomoTimerState} from 'pomodoro'

/* Helper functions for getting the elements */
let timeText = () => document.getElementById('time-text')
let pomoTime = () => document.getElementById('countdown-counter')
let pomoSets = () => document.getElementById('interval-counter')
let pomoCircle = () => document.getElementById('countdown-arc')

let btnToggle = () => document.getElementById('btn-toggle')
let btnToggleIcon = () => document.getElementById('toggle-icon')
let btnTogglePressIcon = () => document.getElementById('toggle-icon-press')
let btnReset = () => document.getElementById('btn-x')
let btnSkip = () => document.getElementById('btn-skip')

btnToggle().addEventListener('mousedown', () => {
  btnToggleIcon().style.visibility = 'hidden'
  btnTogglePressIcon().style.visibility = 'visible'
})
btnToggle().addEventListener('mouseup', () => {
  btnToggleIcon().style.visibility = 'visible'
  btnTogglePressIcon().style.visibility = 'hidden'
})

function getIntvlStateColor (intvlState) {
  let color = null
  switch (intvlState) {
    case PomoIntvlState.work:
      // Pomodoro red. This is the color of the logo picture on this page:
      // http://pomodorotechnique.com
      color = '#d33b37'
      break
    case PomoIntvlState.rest:
      color = 'fb-blue'
      break
    case PomoIntvlState.longRest:
      color = 'fb-mint'
      break
  }
  return color
}

export function datetime (date) {
  /* Takes a Date object to update time related views */
  timeText().text = utils.toMonoDigits(date.getHours()) + ':' +
                    utils.toMonoDigits(date.getMinutes())
}

export function pomodoro (pomoTimer) {
  pomoTime().text = utils.secondsToClock(pomoTimer.countdown / 1000, true)
  pomoSets().text = pomoTimer.doneIntvls.toString() + '/' +
                    pomoTimer.totalIntervals.toString()
  // The countdown circle
  let countdownTotal = null
  switch (pomoTimer.intvlState) {
    case PomoIntvlState.work:
      countdownTotal = pomoTimer.work
      break
    case PomoIntvlState.rest:
      countdownTotal = pomoTimer.rest
      break
    case PomoIntvlState.longRest:
      countdownTotal = pomoTimer.longRest
      break
  }
  pomoCircle().sweepAngle = (pomoTimer.countdown / countdownTotal) * 360

  // When paused, only the circle will be gray. The text will be the color indicating
  // what states it currently on
  // TODO: Maybe the visibility of btnReset shouldn't be here...?
  // XXX: Change the visibility of each button only disabled the touch button,
  //  The corresponding hardware button still works!
  let color = getIntvlStateColor(pomoTimer.intvlState)
  switch (pomoTimer.timerState) {
    case PomoTimerState.running:
      btnToggleIcon().href = 'icons/pause.png'
      btnTogglePressIcon().href = 'icons/pause_press.png'
      pomoTime().style.fill = color
      pomoSets().style.fill = color
      pomoCircle().style.fill = color
      btnReset().style.visibility = 'hidden'
      btnSkip().style.visibility = 'visible'
      break

    case PomoTimerState.paused:
      btnToggleIcon().href = 'icons/play.png'
      btnTogglePressIcon().href = 'icons/play_press.png'
      pomoTime().style.fill = color
      pomoSets().style.fill = color
      pomoCircle().style.fill = 'gray'
      btnReset().style.visibility = 'visible'
      btnSkip().style.visibility = 'visible'
      break

    case PomoTimerState.idle:
      btnToggleIcon().href = 'icons/play.png'
      btnTogglePressIcon().href = 'icons/play_press.png'
      pomoTime().style.fill = 'gray'
      pomoSets().style.fill = 'gray'
      pomoCircle().style.fill = 'gray'
      btnReset().style.visibility = 'hidden'
      btnSkip().style.visibility = 'hidden'
      break
  }
}

/* Not used
let btnTl = () => document.getElementById('btn-tl')
*/
