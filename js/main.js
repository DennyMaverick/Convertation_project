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
const select = document.querySelector("#select")
const resultBtn = document.querySelector(".output-coins__output-btn")

const openThemeBtn = document.querySelector(".switcher-theme__open")
const schemeList = document.querySelector(".scheme-list")
const schemeListItems = document.querySelectorAll(".scheme-item")

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
function convertValueToRight(event) {
  event.preventDefault()
  if (inputValuesState.value === outputValuesState.value) {
    result.value = ""
    input.value = ""
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
}

InputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    if (event.target.dataset.coin) {
      inputValuesState.value = event.target.dataset.coin
    } else if (event.target.dataset.value === "RUS") {
      coinNameIn.innerHTML = `${this.dataset.value.toUpperCase()} - Рубль Россия`
      inputValuesState.value = "RUS"
    }
    if (inputValuesState.value === outputValuesState.value) {
      input.disabled = true
      input.style.backgroundColor = "#5A5A5B"
    } else {
      input.disabled = false
      input.style.backgroundColor = "#fff"
    }

    InputCoinItems.forEach(function (item) {
      item.classList.remove("input-coin--active")
    })
    switch (this.dataset.coin) {
      case "EUR":
        coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Евро США`

        break
      case "USD":
        coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Доллар США`
        break
      case "GBP":
        coinNameIn.innerHTML = `${this.dataset.coin.toUpperCase()} - Фунт стерлингов`
        break
    }
    this.classList.add("input-coin--active")
  })
})

OutputCoinItems.forEach(function (item) {
  item.addEventListener("click", function (event) {
    event.preventDefault()
    if (event.target.dataset.coin) {
      outputValuesState.value = event.target.dataset.coin
    } else if (event.target.dataset.value === "RUS") {
      coinNameOut.innerHTML = `${this.dataset.value.toUpperCase()} - Рубль Россия`
      outputValuesState.value = "RUS"
    }
    if (inputValuesState.value === outputValuesState.value) {
      input.disabled = true
      input.style.backgroundColor = "#5A5A5B"
    } else {
      input.disabled = false
      input.style.backgroundColor = "#fff"
    }
    OutputCoinItems.forEach(function (item) {
      item.classList.remove("output-coin--active")
    })
    switch (this.dataset.coin) {
      case "EUR":
        coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Евро США`

        break
      case "USD":
        coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Доллар США`
        break
      case "GBP":
        coinNameOut.innerHTML = `${this.dataset.coin.toUpperCase()} - Фунт стерлингов`
        break
    }
    this.classList.add("output-coin--active")
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
  this.classList.add("convert-form__input--focus")
})

input.addEventListener("blur", function () {
  this.classList.remove("convert-form__input--focus")
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
