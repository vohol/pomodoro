import * as dfltFunctions from "./modules/defaultFunctions.js";
import * as mainFunctions from "./modules/mainFunctions.js";

dfltFunctions.isWebp();
let timerId;

let circle = new ProgressBar.Circle('#progree-bar', {
  strokeWidth: 4,
  trailWidth: 6,
  svgStyle: {
    display: 'block',
    width: '100%'
  },
  duration: 45000,
});



document.addEventListener('load', function() {
  mainFunctions.setupMainColor()
  mainFunctions.setupMainFont()
})

document.addEventListener('DOMContentLoaded', function() {
  //load default values
  mainFunctions.setupTimers()
})

//button to open settings menu
const settingsButton = document.querySelector('.pomodoro__settings')
settingsButton.addEventListener('click',
  function () {
    //open settings menu
    mainFunctions.addActive('settings')
})

//close button in settings menu
const settingsCloseButton = document.querySelector('.settings__close')
settingsCloseButton.addEventListener('click',
function () {
  //close settings menu without saveing
  mainFunctions.removeActive('settings')
  mainFunctions.resetOption('settings__font-item')
  mainFunctions.resetOption('settings__color-item')
  mainFunctions.resetSelectorsOptions('incr-decr-selector')
  
})

document.addEventListener('click', function(event){
  //tabs handler to toggle breaks in main menu
  
  if (event.target.classList.contains('pomodoro__break-btn')) {
    clearInterval(timerId);
    mainFunctions.setupTimers();
    startButton.dataset.action  = 'start'
    startButton.textContent = 'start'
    circle.set(0)


    mainFunctions.toggleTabs('pomodoro__break-btn', event.target,
    'pomodoro__time', true)
  } 

  
  //tabs handler to toggle fonts in settings
  mainFunctions.toggleTabs('settings__font-item', event.target)
  
  //tabs handler to toggle colors in settings
  mainFunctions.toggleTabs('settings__color-item', event.target)
  
  //increment/decrement action for input's arrows
  mainFunctions.incrementDecrementForSelector(
    event.target, '.incr-decr-selector__button-top',
    '.incr-decr-selector__button-bottom');
})

const applyButton = document.querySelector('.settings__apply')
applyButton.addEventListener('click',
function () {
  mainFunctions.applySettings()
  mainFunctions.removeActive('settings')
})


let increment = 0;
let timeSecs;
let initialTimeSecs;
var step;

const startButton = document.querySelector('.pomodoro__go-btn')
startButton.addEventListener('click',
function () {
  const activeTimer = document.querySelector(`.pomodoro__time--active`)
  const timerMins = activeTimer.children[0]
  const timerSecs = activeTimer.children[1]
  
  switch (startButton.dataset.action) {
    case ('start'):
      startButton.dataset.action  = 'pause'
      startButton.textContent = 'pause'
      circle.set(0)
      
      
      if (timeSecs == 0) {
        mainFunctions.setupTimers();
        timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      }
      
      increment = 0;
      timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      initialTimeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      
      
      step = 1/initialTimeSecs;
      console.log(initialTimeSecs);
      
      timerId = setInterval(function() {

      increment += step
      console.log(increment);
      if (increment < 1) {
        circle.animate(increment, {
          duration: 1000,
        });
      } else {
        circle.set(1)
      }
        // circle.set(increment += increment)
      // console.log(increment += increment)

        timeSecs--
        let displayMins = Math.floor(timeSecs / 60);
        let displaySecs = timeSecs % 60
        
        timerMins.textContent = displayMins < 10 ?
        '0' + displayMins : displayMins;
        timerSecs.textContent = displaySecs < 10 ?
        '0' + displaySecs : displaySecs;
        
        if (timeSecs == 0) {
          clearInterval(timerId);
          startButton.dataset.action  = 'start'
          startButton.textContent = 'start'
          mainFunctions.soundClick()

        }
        
      }, 1000)
      
      break;
      
      case ('restart'):
      startButton.dataset.action  = 'pause'
      startButton.textContent = 'pause'
    
      timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      
      if (timeSecs == 0) {
        mainFunctions.setupTimers();
        timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      }

      timerId = setInterval(function() {

      increment += step
      circle.animate(increment, {
        duration: 1000,
      });
      console.log(increment);

        timeSecs--
        let displayMins = Math.floor(timeSecs / 60);
        let displaySecs = timeSecs % 60
    
        timerMins.textContent = displayMins < 10 ?
          '0' + displayMins : displayMins;
        timerSecs.textContent = displaySecs < 10 ?
        '0' + displaySecs : displaySecs;

        if (timeSecs == 0) {
          clearInterval(timerId);
          startButton.dataset.action  = 'start'
          startButton.textContent = 'start'
          mainFunctions.soundClick()
        }

      }, 1000)
    
      break;

    case 'pause':
      
      clearInterval(timerId);
      startButton.dataset.action  = 'restart'
      startButton.textContent = 'restart'

      break;

    default:
      break;
  }
})




