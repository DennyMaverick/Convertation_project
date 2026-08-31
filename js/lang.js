//* =========== Объект с переводом страницы ==============

const langs = {
  "title-page": {
    ru: "Конвертер валют",
    en: "Сurrency converter",
  },
  "title-first-word": {
    ru: "Конвертер",
    en: "Currency",
  },
  "title-second-word": {
    ru: "валют",
    en: "converter",
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
    ru: "светлая",
    en: "light",
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
    en: "Convert",
  },
  "convert-form-title-rates": {
    ru: "Актуальные курсы",
    en: "Current exchange rates",
  },
  "course-item__description-usd": {
    ru: "Курс USD / RUB",
    en: "Rate USD / RUB",
  },
  "course-item__description-euro": {
    ru: "Курс EUR / RUB",
    en: "Rate EUR / RUB",
  },
  "course-item__description-gbp": {
    ru: "Курс GBP / RUB",
    en: "Rate GBP / RUB",
  },
  "course-item__description-try": {
    ru: "Курс TRY / RUB",
    en: "Rate TRY / RUB",
  },
  "convert-form__subtitle-first-phrase": {
    ru: "Актуальные курсы валют",
    en: "Real-time currency",
  },
  "convert-form__subtitle-second-phrase": {
    ru: "в реальном времени",
    en: "exchange rates",
  },
}

// const repeatElems = {

// }

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
    ru: "Введите сумму",
    en: "Enter amount",
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

  // for (let key in repeatElems) {
  //   let elems = document.querySelectorAll(".lang-" + key)
  //   elems.forEach(function (elem) {
  //     if (elem && repeatElems[key][hash]) {
  //       elem.innerHTML = repeatElems[key][hash]
  //     }
  //   })
  // }
}
// запуск функции changeLang()
changeLang()
