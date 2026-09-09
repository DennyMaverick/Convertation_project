const switchers = document.querySelectorAll(".scheme-item__btn")

const themes = {
  ".convert-form": {
    theme: {
      dark: "convert-form--dark",
      moon: "convert-form--moon",
    },
  },
  body: {
    theme: {
      dark: "body--dark",
      moon: "body--moon",
    },
  },
  ".convert-form__title": {
    theme: {
      dark: "convert-form__title--dark",
      moon: "convert-form__title--moon",
    },
  },
  ".convert-form__courses": {
    theme: {
      dark: "convert-form__courses--dark",
      moon: "convert-form__courses--moon",
    },
  },
  ".switcher-theme__open": {
    theme: {
      dark: "switcher-theme__open--dark",
      moon: "switcher-theme__open--moon",
    },
  },
  ".lang-bar__btn": {
    theme: {
      dark: "lang-bar__btn--dark",
      moon: "lang-bar__btn--moon",
    },
  },
  ".scheme-item__btn": {
    theme: {
      dark: "scheme-item__btn--dark",
      moon: "scheme-item__btn--moon",
    },
  },
  ".input-block": {
    theme: {
      dark: "input-block--dark",
      moon: "input-block--moon",
    },
  },
  ".input-coin--active": {
    theme: {
      dark: "input-coin--active-dark",
      moon: "input-coin--active-moon",
    },
  },
  ".output-coin--active": {
    theme: {
      dark: "output-coin--active-dark",
      moon: "output-coin--active-moon",
    },
  },
  ".coins__item": {
    theme: {
      dark: "coins__item--dark",
      moon: "coins__item--moon",
    },
  },
  ".output-coins__output-btn": {
    theme: {
      dark: "output-coins__output-btn--dark",
      moon: "output-coins__output-btn--moon",
    },
  },
  ".convert-form__input--focus": {
    theme: {
      dark: "convert-form__input--focus-dark",
      moon: "convert-form__input--focus-moon",
    },
  },
}
function themeSwitch(theme) {
  for (key in themes) {
    const elems = document.querySelectorAll(key)
    elems.forEach((elem) => {
      if ((elem && themes[key].theme.dark) || themes[key].theme.moon) {
        elem.classList.remove(`${themes[key].theme.dark}`, `${themes[key].theme.moon}`)

        if (theme === "dark") {
          elem.classList.add(`${themes[key].theme.dark}`)
        } else {
          elem.classList.add(`${themes[key].theme.moon}`)
        }
      }
    })
  }
}

const activeTheme = localStorage.getItem("theme")

let activeThemeStates = {
  currentTheme: `${activeTheme}`,
}

// изменение цвета - замена темы - для неактивного инпута

const colorsThemesInputDisable = {
  state: "",
}

switchers.forEach((switcher) => {
  switcher.addEventListener("click", function (e) {
    if (e.target.closest(".scheme-item__btn").dataset.theme === "moon") {
      themeSwitch("moon")

      activeThemeStates.currentTheme = "moon"
    } else if (e.target.closest(".scheme-item__btn").dataset.theme === "dark") {
      themeSwitch("dark")

      activeThemeStates.currentTheme = "dark"
    } else {
      themeSwitch("dark")

      activeThemeStates.currentTheme = "dark"
    }
    localStorage.setItem("theme", this.dataset.theme)

    // замена цвета неактивного инпута - смена темы при клике на кнопку выбора темы

    if (activeThemeStates.currentTheme === "moon") {
      colorsThemesInputDisable.state = "#3F3FE8"
    } else if (activeThemeStates.currentTheme === "dark") {
      colorsThemesInputDisable.state = "#A79E9E"
    }

    if (inputValuesState.value === outputValuesState.value) {
      input.style.backgroundColor = `${colorsThemesInputDisable.state}`
    }

    // подсветка активному элементу

    switchers.forEach(function (switcher) {
      switcher.classList.remove("scheme-item__btn--active")
    })
    this.classList.add("scheme-item__btn--active")
  })
})

if (activeTheme === null) {
  themeSwitch("dark")
  activeThemeStates = {
    currentTheme: "dark",
  }
} else {
  themeSwitch(activeTheme)
}

// подсветка активному элементу переключателя тем, если еще не было клика
if (activeTheme) {
  const currentThemeBtn = document.querySelector(`[data-theme = ${activeTheme}]`)
  currentThemeBtn.classList.add("scheme-item__btn--active")
} else {
  const currentThemeBtn = document.querySelector(`[data-theme = "dark"]`)
  currentThemeBtn.classList.add("scheme-item__btn--active")
  themeSwitch("dark")
}

// Checking when the system preferences are active

// if (
//   window.matchMedia &&
//   window.matchMedia('(prefers-color-scheme: dark)').matches &&
//   activeTheme === ''
// ) {
//   themeSwitch('dark');
// }

// Changing theme when the System preferences change

// window
//   .matchMedia('(prefers-color-scheme: dark)')
//   .addEventListener('change', event => {
//     const newColorScheme = event.matches ? 'dark' : 'moon';

//     if (newColorScheme === 'dark') {
//       themeSwitch('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       themeSwitch('moon');
//       localStorage.setItem('theme', 'moon');
//     }
//   });
