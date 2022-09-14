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

switchers.forEach((switcher) => {
  switcher.addEventListener("click", function (e) {
    if (e.target.closest(".scheme-item__btn").dataset.theme === "light") {
      themeSwitch("light")
    } else if (e.target.closest(".scheme-item__btn").dataset.theme === "dark") {
      themeSwitch("dark")
    } else {
      themeSwitch("moon")
    }
    localStorage.setItem("theme", this.dataset.theme)
  })
})

const activeTheme = localStorage.getItem("theme")

if (activeTheme === null) {
  themeSwitch("dark")
} else {
  themeSwitch(activeTheme)
}
