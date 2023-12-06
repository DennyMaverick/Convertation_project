// сначала нужно json файл(https://www.cbr-xml-daily.ru/daily_json.js) перевести в
// javascript объект
// затем в объекте получить валюту и его значение
//
//
// fetch('https://www.cbr-xml-daily.ru/daily_json.js').then(function (result) {
//     return result.json()
// }).then(function (data) {

// });
//  Объект с курсами 3-х валют
const rates = {}
//  Элементы для отображения курса валют
const convertForm = document.querySelector(".convert-form")
const InputCoinItems = document.querySelectorAll(".input-coins__item")
const OutputCoinItems = document.querySelectorAll(".output-coins__item")
const coinNameOut = document.querySelector("#coinNameOut")
const coinNameIn = document.querySelector("#coinNameIn")
const elementUSD = document.querySelector('[data-value="USD"]')
const elementEUR = document.querySelector('[data-value="EUR"]')
const elementGBP = document.querySelector('[data-value="GBP"]')
// Элементы формы, ввод суммы, выбор валюты, поле с результатом
const input = document.querySelector("#input")
const result = document.querySelector("#result")
const resultSign = document.querySelector(".output-coins__sign-value")
const inputSign = document.querySelector(".input-coins__sign-value")
const select = document.querySelector("#select")
const resultBtn = document.querySelector(".output-coins__output-btn")

const openThemeBtn = document.querySelector(".switcher-theme__open")
const schemeList = document.querySelector(".scheme-list")
const schemeListItems = document.querySelectorAll(".scheme-item")

const arrowsInInput = document.querySelector(".arrows")
const arrowLeft = document.querySelector(".arrows__left")
const arrowRight = document.querySelector(".arrows__right")

getCurrencies()

// Функция получения курса валют и отображения их на странице
async function getCurrencies() {
  const response = await fetch("https://www.cbr-xml-daily.ru/daily_json.js")
  const data = await response.json()
  const result = await data

  rates.USD = result.Valute.USD
  rates.EUR = result.Valute.EUR
  rates.GBP = result.Valute.GBP

  elementUSD.textContent = rates.USD.Value.toFixed(2)
  elementEUR.textContent = rates.EUR.Value.toFixed(2)
  elementGBP.textContent = rates.GBP.Value.toFixed(2)
  // цвет для информера USD
  if (rates.USD.Value > rates.USD.Previous) {
    elementUSD.classList.add("top")
  } else {
    elementUSD.classList.add("bottom")
  }
  //  цвет для информера EUR
  if (rates.EUR.Value > rates.EUR.Previous) {
    elementEUR.classList.add("top")
  } else {
    elementEUR.classList.add("bottom")
  }
  //  цвет для информера GBP
  if (rates.GBP.Value > rates.GBP.Previous) {
    elementGBP.classList.add("top")
  } else {
    elementGBP.classList.add("bottom")
  }
}

result.readOnly = "true"

const inputValuesState = {
  value: "RUS",
}

const outputValuesState = {
  value: "USD",
}
// Слушаем изменения в input, select и result
// input.oninput = convertValueToRight
// result.oninput = convertValueToLeft
// Функция конвертации
function convertValueToRight() {
  if (inputValuesState.value === outputValuesState.value) {
    result.value = ""
    input.value = ""
    arrowsInInput.classList.remove("arrows--active")
  }

  OutputCoinItems.forEach((item) => {
    if (input.value && item.classList.contains("output-coin--active")) {
      switch (inputValuesState.value) {
        case "RUS":
          if (item.dataset.coin) {
            result.value = (parseFloat(input.value) / rates[item.dataset.coin].Value).toFixed(2)
          }
          break
        case "EUR":
          if (item.dataset.coin) {
            result.value = ((parseFloat(input.value) * rates[`${inputValuesState.value}`].Value).toFixed(2) / rates[item.dataset.coin].Value).toFixed(2)
          }

          break
        case "USD":
          if (item.dataset.coin) {
            result.value = ((parseFloat(input.value) * rates[`${inputValuesState.value}`].Value).toFixed(2) / rates[item.dataset.coin].Value).toFixed(2)
          }

          break
        case "GBP":
          if (item.dataset.coin) {
            result.value = ((parseFloat(input.value) * rates[`${inputValuesState.value}`].Value).toFixed(2) / rates[item.dataset.coin].Value).toFixed(2)
          }

          break
      }
    } else if (!input.value) {
      // clear
      result.value = ""
    }
  })
  InputCoinItems.forEach((item) => {
    if (input.value && item.classList.contains("input-coin--active")) {
      switch (outputValuesState.value) {
        case "RUS":
          if (item.dataset.coin) {
            result.value = (parseFloat(input.value) * rates[item.dataset.coin].Value).toFixed(2)
          }
          break
      }
    }
  })

  if (input.value < 0) {
    result.value = ""
  } else {
    input.style.backgroundColor = "white"
  }
}

InputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    if (event.target.dataset.coin) {
      inputValuesState.value = event.target.dataset.coin
    } else if (event.target.dataset.value === "RUS") {
      if (langCurrentStates.startState === "ru") {
        coinNameIn.innerHTML = `${this.dataset.value.toUpperCase()} - Рубль Россия`
      } else {
        coinNameIn.innerHTML = `${this.dataset.value.toUpperCase()} - Ruble Russia`
      }
      inputValuesState.value = "RUS"
    }
    if (inputValuesState.value === outputValuesState.value) {
      input.disabled = true
      input.style.backgroundColor = `${colorsThemesInputDisable.state}`
    } else {
      input.disabled = false
      input.style.backgroundColor = "#fff"
    }

    InputCoinItems.forEach(function (item) {
      item.classList.remove("input-coin--active", "input-coin--active-light", "input-coin--active-dark", "input-coin--active-moon")
    })
    switch (this.dataset.coin) {
      case "EUR":
        if (langCurrentStates.startState === "ru") {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Евро США`
        } else {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} -Euro USA`
        }

        break
      case "USD":
        if (langCurrentStates.startState === "ru") {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Доллар США`
        } else {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Dollar USA`
        }
        break
      case "GBP":
        if (langCurrentStates.startState === "ru") {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Фунт стерлингов`
        } else {
          coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Pound sterling`
        }
        break
    }
    this.classList.add("input-coin--active", `input-coin--active-${activeThemeStates.currentTheme}`)

    if (inputValuesState.value === outputValuesState.value) {
      arrowsInInput.classList.remove("arrows--active")
    }
  })
})

OutputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    if (event.target.dataset.coin) {
      outputValuesState.value = event.target.dataset.coin
    } else if (event.target.dataset.value === "RUS") {
      if (langCurrentStates.startState === "ru") {
        coinNameOut.innerHTML = `${this.dataset.value.toUpperCase()} - Рубль Россия`
      } else {
        coinNameOut.innerHTML = `${this.dataset.value.toUpperCase()} - Ruble Russia`
      }
      outputValuesState.value = "RUS"
    }
    if (inputValuesState.value === outputValuesState.value) {
      input.disabled = true
      input.style.backgroundColor = `${colorsThemesInputDisable.state}`
    } else {
      input.disabled = false
      input.style.backgroundColor = "#fff"
    }
    OutputCoinItems.forEach(function (item) {
      item.classList.remove("output-coin--active", "output-coin--active-light", "output-coin--active-dark", "output-coin--active-moon")
    })
    switch (this.dataset.coin) {
      case "EUR":
        if (langCurrentStates.startState === "ru") {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Евро США`
        } else {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Euro USA`
        }
        break
      case "USD":
        if (langCurrentStates.startState === "ru") {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Доллар США`
        } else {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Dollar USA`
        }
        break
      case "GBP":
        if (langCurrentStates.startState === "ru") {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Фунт стерлингов`
        } else {
          coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Pound sterling`
        }
        break
    }
    this.classList.add("output-coin--active", `output-coin--active-${activeThemeStates.currentTheme}`)

    if (inputValuesState.value === outputValuesState.value) {
      arrowsInInput.classList.remove("arrows--active")
    }
  })
})

resultBtn.addEventListener("click", convertValueToRight)

// clear result
input.oninput = clearResult

function clearResult() {
  if (!input.value) {
    result.value = ""
  }
}

// input focus - blur

input.addEventListener("focus", function () {
  this.classList.add(`convert-form__input--focus-${activeThemeStates.currentTheme}`)
})

input.addEventListener("blur", function () {
  this.classList.remove(`convert-form__input--focus-${activeThemeStates.currentTheme}`)
})

// open close scheme-list

openThemeBtn.addEventListener("click", function (e) {
  e.preventDefault()
  schemeList.classList.toggle("vhidden")
  this.classList.toggle("switcher-theme__open--active")
})

convertForm.addEventListener("click", (e) => {
  if (!e.target.classList.contains("switcher-theme__open") && !e.target.classList.contains("scheme-item__btn")) {
    schemeList.classList.add("vhidden")
    openThemeBtn.classList.remove("switcher-theme__open--active")
  }
})

schemeListItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault()
  })
})

// ограничение введения количества символов в input

input.addEventListener("input", function () {
  const limit = 7
  const splitString = this.value.split("")
  if (input.value.length > limit) {
    this.value = splitString.slice(0, limit).join("")
  }
})

// замена цвета неактивного инпута - смена темы при старте страницы

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

if (document.documentElement.clientWidth < "768") {
  const langsShort = {
    ru: "тема",
    en: "theme",
  }
  if (hash === "ru") {
    openThemeBtn.innerHTML = `${langsShort[hash]}`
  } else {
    openThemeBtn.innerHTML = `${langsShort[hash]}`
  }
} else {
  const langsLong = {
    ru: "выбрать тему",
    en: "change theme",
  }
  if (hash === "ru") {
    openThemeBtn.innerHTML = `${langsLong[hash]}`
  } else {
    openThemeBtn.innerHTML = `${langsLong[hash]}`
  }
}

window.addEventListener("resize", function () {
  if (document.documentElement.clientWidth < "768") {
    const langsShort = {
      ru: "тема",
      en: "theme",
    }
    if (hash === "ru") {
      openThemeBtn.innerHTML = `${langsShort[hash]}`
    } else {
      openThemeBtn.innerHTML = `${langsShort[hash]}`
    }
  } else {
    const langsLong = {
      ru: "выбрать тему",
      en: "change theme",
    }
    if (hash === "ru") {
      openThemeBtn.innerHTML = `${langsLong[hash]}`
    } else {
      openThemeBtn.innerHTML = `${langsLong[hash]}`
    }
  }
})

// При нажатии на enter внутри поля ввода, должен происходить подсчет

input.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    this.blur()
    convertValueToRight()
    event.preventDefault()
  }
})

// Добавление знака валюты при клике на кнопки валют
// функция обновления символа
function updateSignResultValue(signValue) {
  resultSign.innerHTML = signValue
}

function updateSignInputValue(signValue) {
  inputSign.innerHTML = signValue
}
// значение символа по умолчанию
updateSignResultValue("&#36;")
updateSignInputValue("&#8381;")
OutputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    const dataAttrSign = event.target.dataset.signValue
    switch (dataAttrSign) {
      case "RUS":
        updateSignResultValue("&#8381;")
        break
      case "EUR":
        updateSignResultValue("&#8364;")
        break
      case "GBP":
        updateSignResultValue("&#163;")
        break
      case "USD":
        updateSignResultValue("&#36;")
        break
      default:
        updateSignResultValue("&#36;")
        break
    }
  })
})

InputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    const dataAttrSign = event.target.dataset.signValue
    switch (dataAttrSign) {
      case "RUB":
        updateSignInputValue("&#8381;")
        break
      case "EUR":
        updateSignInputValue("&#8364;")
        break
      case "GBP":
        updateSignInputValue("&#163;")
        break
      case "USD":
        updateSignInputValue("&#36;")
        break
      default:
        updateSignInputValue("&#8381;")
        break
    }
  })
})

// добавление кастомных стрелочек в input

arrowsInInput.addEventListener("mouseenter", function (e) {
  e.stopPropagation()
})

input.addEventListener("click", function () {
  arrowsInInput.classList.toggle("arrows--active")
})

arrowLeft.addEventListener("click", function () {
  input.stepDown()
  if (input.value < 0) {
    inputForm.style.backgroundColor = "red"
  } else {
    input.style.backgroundColor = "white"
  }
})
arrowRight.addEventListener("click", function () {
  input.stepUp()
  if (input.value < 0) {
    input.style.backgroundColor = "red"
  } else {
    input.style.backgroundColor = "white"
  }
})


