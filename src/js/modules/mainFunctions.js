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

export function changeActiveClassFromLocalStorage(nonActiveClass, 
   dataAction) {
    const tabs = document.querySelectorAll(`.${nonActiveClass}`)
    const activeClass = `${nonActiveClass}--active`

    tabs.forEach(element => {
      element.classList.remove(activeClass)

      if (element.dataset.action == dataAction) {
        element.classList.add(activeClass)
      }
    });
    

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
  localStorage.setItem("pomodoroStorage", pomodoro.value )
  localStorage.setItem("shortBreakStorage", shortBreak.value )
  localStorage.setItem("longBreakStorage", longBreak.value )
  setupTimers()

  switch (true) {
    case color.classList.contains('settings__color-item--red'):
    default:
      newColor = '#F87070'
      break;
    case color.classList.contains('settings__color-item--blue'):
      newColor = '#70F3F8'
      break;
    case color.classList.contains('settings__color-item--purple'):
      newColor = '#F87070'
      break;
  }
  
  localStorage.setItem("color", newColor)
  setupMainColor()
  allColors.forEach(element => {
    element.dataset.active='false'
  });
  color.dataset.active='true'
  
  switch (true) {
    case font.classList.contains('settings__font-item--kumbh'):
    default:
      newFont = "'Kumbh Sans', sans-serif"
      break;
    case font.classList.contains('settings__font-item--roboto'):
      newFont = "'Roboto Slab', serif"
      break;
    case font.classList.contains('settings__font-item--space'):
      newFont = "'Space Mono', monospace"
      break;
  }

  localStorage.setItem("font", newFont)
  setupMainFont(newFont)
  allFonts.forEach(element => {
    element.dataset.active='false'
  });
  font.dataset.active='true'
}

//function for setup value --main-color in css
export function setupMainColor (color='#F87070') {
  let newColor = localStorage.getItem("color") ? localStorage.getItem("color") : color;
  document.documentElement.style.setProperty("--main-color", newColor);
}
//function for setup value --main-font in css
export function setupMainFont (font="'Kumbh Sans', sans-serif") {
  let newFont = localStorage.getItem("font") ? localStorage.getItem("font") : font;
  document.documentElement.style.setProperty("--main-font", newFont);
}

export function setupTimersFromLocalStorage() {

  let pomodoroStorage;
  let shortBreakStorage;
  let longBreakStorage;

  pomodoroStorage = localStoraGetItemById("pomodoroStorage", 'pomodoro-setup')
  shortBreakStorage = localStoraGetItemById("shortBreakStorage", 'short-break-setup')
  longBreakStorage = localStoraGetItemById("longBreakStorage", 'long-break-setup')


  const pomodoroTimer = document.querySelector('.pomodoro-timer__mins')
  const shortBreakTimer = document.querySelector('.short-break-timer__mins')
  const longBreakTimer = document.querySelector('.long-break-timer__mins')
  const pomodoroTimerSecs = document.querySelector('.pomodoro-timer__secs')
  const shortBreakTimerSecs = document.querySelector('.short-break-timer__secs')
  const longBreakTimerSecs = document.querySelector('.long-break-timer__secs')

  pomodoroTimer.textContent = Number(pomodoroStorage) < 10 ? '0' + pomodoroStorage : pomodoroStorage;
  shortBreakTimer.textContent = Number(shortBreakStorage )< 10 ? '0' + shortBreakStorage : shortBreakStorage;
  longBreakTimer.textContent = Number(longBreakStorage) < 10 ? '0' + longBreakStorage : longBreakStorage;
  pomodoroTimerSecs.textContent = '00'
  shortBreakTimerSecs.textContent = '00'
  longBreakTimerSecs.textContent = '00'
}

function localStoraGetItemById(localStorageItem, id, value) {
  if (localStorage.getItem(localStorageItem)) {
    value = Number(localStorage.getItem(localStorageItem))
    document.querySelector(`#${id}`).dataset.activeValue = value
  } else {
    value = Number(document.querySelector(`#${id}`).dataset.activeValue )
  }
  return value
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


export function soundClick() {
  let audio = new Audio(); 
  audio.src = 'files/din.mp3'; 
  audio.play() 
}