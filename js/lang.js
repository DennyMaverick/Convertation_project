//* =========== Объект с переводом страницы ==============

const langs = {
  title: {
    ru: "Конвертер валют",
    en: "Сurrency converter",
  },
  "course-item__title-usd": {
    ru: "Курс USD",
    en: "USD Rate",
  },
  "course-item__title-eur": {
    ru: "Курс EUR",
    en: "EUR Rate",
  },
  "course-item__title-gbp": {
    ru: "Курс GBP",
    en: "GBP Rate",
  },
  "switcher-theme__open": {
    ru: "выбрать тему",
    en: "change theme",
  },
  "light-theme": {
    ru: "светлая",
    en: "light",
  },
  "dark-theme": {
    ru: "тёмная",
    en: "dark",
  },
  "moon-theme": {
    ru: "лунная",
    en: "moon",
  },
  "form-output__title": {
    ru: "Получаю:",
    en: "Get:",
  },
  "form-input__title": {
    ru: "Отдаю:",
    en: "Give:",
  },
  "form-output__coin": {
    ru: "USD — Доллар США",
    en: "USD — Dollar USA",
  },
  "form-input__coin": {
    ru: "RUB - Рубль Россия",
    en: "RUB — Ruble Russia",
  },
  "output-coins__output-btn": {
    ru: "Посчитать",
    en: "Count",
  },
}

// получение hash из строки браузера - #ru или #en
let hash = window.location.hash
// начало hash массива строки начинается со второго символа - ru или en
hash = hash.substr(1)

const langCurrentStates = {
  startState: hash,
}

// ====== Секция  placeholders

const placeholders = {
  input: {
    ru: "Введите число",
    en: "Enter a number",
  },
}

const langItems = document.querySelectorAll(".lang-bar__btn")
// Массив всех доступных языков
const allLangs = ["ru", "en"]

langItems.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault()
    // получение hash из строки браузера - #ru или #en

    // получение значения атрибута data-lang (ru или en)
    let lang = this.dataset.lang

    // добавление в строку браузера #ru или #en
    location.href = window.location.pathname + "#" + lang

    // перезагрузка страницы
    location.reload()
  })
})
function changeLang() {
  // проверка - если массив из всех доступных языков не содержит hash
  if (!allLangs.includes(hash)) {
    // принудительно записывать в строку браузера путь с языком
    location.href = window.location.pathname + "#ru"
    // перезагрузка страницы
    location.reload()
  }

  // перебор массива langs
  for (let key in langs) {
    // получение элементов в html, которые нужно перевести
    let elem = document.querySelector(".lang-" + key)
    // если элемент существует и язык для элемента прописан в объекте с переводом языков, то заменить содержание контента в элементе на тот контент, который взят из массива langs
    if (elem && langs[key][hash]) {
      elem.innerHTML = langs[key][hash]
    }
  }
  // Для плейсхолдеров
  for (let key in placeholders) {
    let elemPlaceholder = document.querySelector(".lang-placeholder-" + key)
    if (elemPlaceholder && placeholders[key][hash]) {
      elemPlaceholder.placeholder = placeholders[key][hash]
    }
  }
}
// запуск функции changeLang()
changeLang()
