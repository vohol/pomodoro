import * as dfltFunctions from "./modules/defaultFunctions.js";
import * as mainFunctions from "./modules/mainFunctions.js";

dfltFunctions.isWebp();
const applyButton = document.querySelector('.settings__apply')
const startButton = document.querySelector('.pomodoro__go-btn')
let timerId;
let increment;
let timeSecs;
let initialTimeSecs;
var step;

let circle = new ProgressBar.Circle('#progree-bar', {
  strokeWidth: 4,
  trailWidth: 6,
  svgStyle: {
    display: 'block',
    width: '100%'
  },
  duration: 45000,
});

function setupActiveTimer() {
  console.log(localStorage.getItem('activeTimer'));
  //setup active timer
  if (localStorage.getItem('activeTimer')) {
    mainFunctions.changeActiveClassFromLocalStorage('pomodoro__break-btn', localStorage.getItem('activeTimer'))
    mainFunctions.changeActiveClassFromLocalStorage('pomodoro__time',
     localStorage.getItem('activeTimer'))
  
    step = Number(localStorage.getItem('stepForAnimation'))
    increment = Number(localStorage.getItem('animationPosition'))
    circle.set(increment)
    console.log(step);
    console.log(increment);

    document.querySelector('.pomodoro__time--active').children[0].textContent = Number(localStorage.getItem('activeMinutes')) < 10 ?
    '0' + localStorage.getItem('activeMinutes') : localStorage.getItem('activeMinutes');

    document.querySelector('.pomodoro__time--active').children[1].textContent = Number(localStorage.getItem('activeSeconsd')) < 10 ?
    '0' + localStorage.getItem('activeSeconsd') : localStorage.getItem('activeSeconsd');
    startButton.dataset.action  = 'restart'
    mainClockHandler()

  }
}

document.addEventListener('DOMContentLoaded', function() {
  //load default values
  mainFunctions.setupMainFont()
  mainFunctions.setupMainColor()
  mainFunctions.setupTimersFromLocalStorage()
  setupActiveTimer()
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
    localStorage.removeItem('activeTimer')
    localStorage.removeItem('activeMinutes')
    localStorage.removeItem('activeSeconsd')
    localStorage.removeItem('animationPosition')
    localStorage.removeItem('stepForAnimation')


    mainFunctions.toggleTabs('pomodoro__break-btn', event.target,
    'pomodoro__time', true)
  } 

  if (event.target.classList.contains('overlay')) {
    mainFunctions.removeActive('settings')
    mainFunctions.resetOption('settings__font-item')
    mainFunctions.resetOption('settings__color-item')
    mainFunctions.resetSelectorsOptions('incr-decr-selector')
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


applyButton.addEventListener('click',
function () {
  mainFunctions.applySettings()
  mainFunctions.removeActive('settings')
  clearInterval(timerId);
  startButton.dataset.action  = 'start'
  startButton.textContent = 'start'
  circle.set(0)
})



startButton.addEventListener('click', mainClockHandler
)

function mainClockHandler() {
  const activeTimer = document.querySelector(`.pomodoro__time--active`)
  localStorage.setItem('activeTimer', activeTimer.dataset.action)
  const timerMins = activeTimer.children[0]
  const timerSecs = activeTimer.children[1]
  
  switch (startButton.dataset.action) {
    case ('start'):

      startButton.dataset.action  = 'pause'
      startButton.textContent = 'pause'
      circle.set(0);
      
      
      if (timeSecs == 0) {
        mainFunctions.setupTimers();
        timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      }
      
      increment = 0;
      

      timeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      initialTimeSecs = +timerMins.textContent * 60 + +timerSecs.textContent;
      
      step = 1/initialTimeSecs;
      
      localStorage.setItem('stepForAnimation', step)
      
      timerId = setInterval(function() {

      increment += step
      localStorage.setItem('animationPosition', increment)
      if (increment < 1) {
        circle.animate(increment, {
          duration: 1000,
        });
      } else {
        circle.set(1)
      }


        timeSecs--
        let displayMins = Math.floor(timeSecs / 60);
        localStorage.setItem('activeMinutes', displayMins )
        let displaySecs = timeSecs % 60
        localStorage.setItem('activeSeconsd', displaySecs )
        
        timerMins.textContent = displayMins < 10 ?
        '0' + displayMins : displayMins;
        timerSecs.textContent = displaySecs < 10 ?
        '0' + displaySecs : displaySecs;
        
        if (timeSecs == 0) {
          clearInterval(timerId);
          startButton.dataset.action  = 'start'
          startButton.textContent = 'start'
          mainFunctions.soundClick()
          localStorage.removeItem('activeTimer')
          localStorage.removeItem('activeMinutes')
          localStorage.removeItem('activeSeconsd')
          localStorage.removeItem('animationPosition')
          localStorage.removeItem('stepForAnimation')

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
        console.log(step);
        console.log(increment);
      increment += step
      console.log(step);
    console.log(increment);
      localStorage.setItem('stepForAnimation', step)
      circle.animate(increment, {
        duration: 1000,
      });

        timeSecs--
        let displayMins = Math.floor(timeSecs / 60);
        localStorage.setItem('activeMinutes', displayMins )
        let displaySecs = timeSecs % 60
        localStorage.setItem('activeSeconsd', displaySecs )
    
        timerMins.textContent = displayMins < 10 ?
          '0' + displayMins : displayMins;
        timerSecs.textContent = displaySecs < 10 ?
        '0' + displaySecs : displaySecs;

        if (timeSecs == 0) {
          clearInterval(timerId);
          startButton.dataset.action  = 'start'
          startButton.textContent = 'start'
          mainFunctions.soundClick()
          localStorage.removeItem('activeTimer')
          localStorage.removeItem('activeMinutes')
          localStorage.removeItem('activeSeconsd')
          localStorage.removeItem('animationPosition')
          localStorage.removeItem('stepForAnimation')
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
}