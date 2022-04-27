//function to add  new class'class--active'
export function addActive(nonActiveClass) {
  const element = document.querySelector(`.${nonActiveClass}`)
  element.classList.add(`${nonActiveClass}--active`)
}

//function to toggle new class'class--active'
export function toggleActive(nonActiveClass) {
  const element = document.querySelector(`.${nonActiveClass}`)
  element.classList.toggle(`${nonActiveClass}--active`)
}

//function to remove new class'class--active'
export function removeActive(nonActiveClass) {
  const element = document.querySelector(`.${nonActiveClass}`)
  element.classList.remove(`${nonActiveClass}--active`)
}

//function to toggle tabs
export function toggleTabs(nonActiveClass, target, 
  nonActiveClassSecondElem, dataAction) {
  const tabs = document.querySelectorAll(`.${nonActiveClass}`)
  const activeClass = `${nonActiveClass}--active`
  const tabsElements = document.querySelectorAll(`.${nonActiveClassSecondElem}`)
  const tabsElementActiveClass = `${nonActiveClassSecondElem}--active`

  if (target.classList.contains(nonActiveClass) && !target.classList.contains(activeClass)) {

    tabs.forEach(element => {
      element.classList.remove(activeClass)
    });

    target.classList.add(activeClass)

    if (dataAction === true) {
      tabsElements.forEach(element => {
        element.classList.remove(tabsElementActiveClass)
        if (element.dataset.action == target.dataset.action) {
          element.classList.add(tabsElementActiveClass)
        }
      });

    }
  }
}

//function to reset color or font setting when close settings 
export function resetOption(nonActiveClass) {
  const activeClass = `${nonActiveClass}--active`
  const allOptions = document.querySelectorAll(`.${nonActiveClass}`)

  setTimeout(() => {
    allOptions.forEach(element => {
      element.classList.remove(activeClass)
    });
    allOptions.forEach(element => {
      if (element.dataset.active=='true') element.classList.add(activeClass)
    });
  }, 300);
}

export function incrementDecrementForSelector (
  target, incrementButtonClass, decrementButtonClass, min=5,max=60) {

  if (target.closest(incrementButtonClass) && 
  target.parentNode.previousElementSibling.value < max) {
    target.parentNode.previousElementSibling.value++
  }
  if (target.closest(decrementButtonClass) && 
  target.parentNode.previousElementSibling.value > min) {
    target.parentNode.previousElementSibling.value--
  }
}

export function resetSelectorsOptions ( selectorClass ) {
  const allOptions = document.querySelectorAll(`.${selectorClass}`)

  setTimeout(() => {
    allOptions.forEach(element => {
      element.value = element.dataset.activeValue
    });
  }, 300);
}

//function to setup new color, font and traker after press button Apply
export function applySettings () {
  const pomodoro = document.querySelector('#pomodoro-setup')
  const shortBreak = document.querySelector('#short-break-setup')
  const longBreak = document.querySelector('#long-break-setup')
  const color = document.querySelector('.settings__color-item--active')
  const allColors = document.querySelectorAll('.settings__color-item')
  const font = document.querySelector('.settings__font-item--active')
  const allFonts = document.querySelectorAll('.settings__font-item')
  let newColor; let newFont;

  pomodoro.dataset.activeValue = pomodoro.value;
  shortBreak.dataset.activeValue = shortBreak.value;
  longBreak.dataset.activeValue = longBreak.value;
  setupTimers()

  if (color.classList.contains('settings__color-item--red')) {
    newColor = '#F87070'
  } else if (color.classList.contains('settings__color-item--blue')) {
    newColor = '#70F3F8'
  } else if (color.classList.contains('settings__color-item--purple')) {
    newColor = '#D881F8'
  } else {
    newColor = '#F87070'
  }

  setupMainColor(newColor)
  allColors.forEach(element => {
    element.dataset.active='false'
  });
  color.dataset.active='true'

  if (font.classList.contains('settings__font-item--kumbh')) {
    newFont = "'Kumbh Sans', sans-serif"
  } else if (font.classList.contains('settings__font-item--roboto')) {
    newFont = "Roboto Slab', serif"
  } else if (font.classList.contains('settings__font-item--space')) {
    newFont = "'Space Mono', monospace"
  } else {
    newFont = "'Kumbh Sans', sans-serif"
  }

  setupMainFont(newFont)
  allFonts.forEach(element => {
    element.dataset.active='false'
  });
  font.dataset.active='true'
}

//function for setup value --main-color in css
export function setupMainColor (color='#F87070') {
  document.documentElement.style.setProperty("--main-color", color);
}
//function for setup value --main-font in css
export function setupMainFont (font="'Kumbh Sans', sans-serif") {
  document.documentElement.style.setProperty("--main-font", font);
}

export function setupTimers() {
  const pomodoroStorage = document.querySelector('#pomodoro-setup').dataset.activeValue 
  const shortBreakStorage = document.querySelector('#short-break-setup').dataset.activeValue 
  const longBreakStorage = document.querySelector('#long-break-setup').dataset.activeValue 

  const pomodoroTimer = document.querySelector('.pomodoro-timer__mins')
  const shortBreakTimer = document.querySelector('.short-break-timer__mins')
  const longBreakTimer = document.querySelector('.long-break-timer__mins')
  const pomodoroTimerSecs = document.querySelector('.pomodoro-timer__secs')
  const shortBreakTimerSecs = document.querySelector('.short-break-timer__secs')
  const longBreakTimerSecs = document.querySelector('.long-break-timer__secs')

  pomodoroTimer.textContent = pomodoroStorage < 10 ? '0' + pomodoroStorage : pomodoroStorage;
  shortBreakTimer.textContent = shortBreakStorage < 10 ? '0' + shortBreakStorage : shortBreakStorage;
  longBreakTimer.textContent = longBreakStorage < 10 ? '0' + longBreakStorage : longBreakStorage;
  pomodoroTimerSecs.textContent = '00'
  shortBreakTimerSecs.textContent = '00'
  longBreakTimerSecs.textContent = '00'


}


// export function startTimer (timerClass) {
//   const activeTimer = document.querySelector(`.${timerClass}`)
//   const timerMins = activeTimer.children[0]
//   const timerSecs = activeTimer.children[1]
//   let timeSecs = +timerMins.textContent * 60;
    
//   let timerId = setInterval(function() {
//     timeSecs--
//     let displayMins = Math.floor(timeSecs / 60);
//     let displaySecs = timeSecs % 60

//     timerMins.textContent = displayMins < 10 ?
//       '0' + displayMins : displayMins;
//     timerSecs.textContent = displaySecs < 10 ?
//     '0' + displaySecs : displaySecs;
//   }, 1000)

//   if (timerId == 0) clearInterval(timerId);

// }