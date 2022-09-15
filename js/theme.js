const switchers = document.querySelectorAll(".scheme-item__btn")


const themes = {
  ".convert-form": {
    theme: {
      light: "convert-form--light",
      dark: "convert-form--dark",
      moon: "convert-form--moon",
    },
  },
  body: {
    theme: {
      light: "body--light",
      dark: "body--dark",
      moon: "body--moon",
    },
  },
  ".convert-form__title": {
    theme: {
      light: "convert-form__title--light",
      dark: "convert-form__title--dark",
      moon: "convert-form__title--moon",
    },
  },
  ".convert-form__courses": {
    theme: {
      light: "convert-form__courses--light",
      dark: "convert-form__courses--dark",
      moon: "convert-form__courses--moon",
    },
  },
  ".switcher-theme__open": {
    theme: {
      light: "switcher-theme__open--light",
      dark: "switcher-theme__open--dark",
      moon: "switcher-theme__open--moon",
    },
  },
  ".lang-bar__btn": {
    theme: {
      light: "lang-bar__btn--light",
      dark: "lang-bar__btn--dark",
      moon: "lang-bar__btn--moon",
    },
  },
  ".scheme-item__btn": {
    theme: {
      light: "scheme-item__btn--light",
      dark: "scheme-item__btn--dark",
      moon: "scheme-item__btn--moon",
    },
  },
  ".input-block": {
    theme: {
      light: "input-block--light",
      dark: "input-block--dark",
      moon: "input-block--moon",
    },
  },
  ".input-coin--active": {
    theme: {
      light: "input-coin--active-light",
      dark: "input-coin--active-dark",
      moon: "input-coin--active-moon",
    },
  },
  ".output-coin--active": {
    theme: {
      light: "output-coin--active-light",
      dark: "output-coin--active-dark",
      moon: "output-coin--active-moon",
    },
  },
  ".coins__item": {
    theme: {
      light: "coins__item--light",
      dark: "coins__item--dark",
      moon: "coins__item--moon",
    },
  },
  ".output-coins__output-btn": {
    theme: {
      light: "output-coins__output-btn--light",
      dark: "output-coins__output-btn--dark",
      moon: "output-coins__output-btn--moon",
    },
  },
  ".convert-form__input--focus": {
    theme: {
      light: "convert-form__input--focus-light",
      dark: "convert-form__input--focus-dark",
      moon: "convert-form__input--focus-moon",
    },
  },
}
function themeSwitch(theme) {
  for (key in themes) {
    const elems = document.querySelectorAll(key)
    elems.forEach((elem) => {
      if ((elem && themes[key].theme.light) || themes[key].theme.dark || themes[key].theme.moon) {
        elem.classList.remove(`${themes[key].theme.dark}`, `${themes[key].theme.light}`, `${themes[key].theme.moon}`)

        if (theme === "light") {
          elem.classList.add(`${themes[key].theme.light}`)
        } else if (theme === "dark") {
          elem.classList.add(`${themes[key].theme.dark}`)
        } else {
          elem.classList.add(`${themes[key].theme.moon}`)
        }
      }
    })
  }
}

const activeTheme = localStorage.getItem("theme")

const activeThemeStates = {
  currentTheme: `${activeTheme}`,
}

// изменение цвета - замена темы - для неактивного инпута

const colorsThemesInputDisable = {
  state: "",
}

switchers.forEach((switcher) => {
  switcher.addEventListener("click", function (e) {
    if (e.target.closest(".scheme-item__btn").dataset.theme === "light") {
      themeSwitch("light")

      activeThemeStates.currentTheme = "light"
    } else if (e.target.closest(".scheme-item__btn").dataset.theme === "dark") {
      themeSwitch("dark")

      activeThemeStates.currentTheme = "dark"
    } else {
      themeSwitch("moon")

      activeThemeStates.currentTheme = "moon"
    }
    localStorage.setItem("theme", this.dataset.theme)

    // замена цвета неактивного инпута - смена темы при клике на кнопку выбора темы

    if (activeThemeStates.currentTheme === "light") {
      colorsThemesInputDisable.state = "#48A9A9"
    } else if (activeThemeStates.currentTheme === "dark") {
      colorsThemesInputDisable.state = "#A79E9E"
    } else {
      colorsThemesInputDisable.state = "#3F3FE8"
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
} else {
  themeSwitch(activeTheme)
}

// подсветка активному элементу переключателя тем, если еще не было клика

const currentThemeBtn = document.querySelector(`[data-theme = ${activeTheme}]`)

currentThemeBtn.classList.add("scheme-item__btn--active")
