# 💱 Конвертер Валют (Currency Converter)

![main pic](https://github.com/DennyMaverick/Convertation_project/raw/main/img-readme/3-moon.png)

---

![main pic](https://github.com/DennyMaverick/Convertation_project/raw/main/img-readme/3-dark.png)

---

Простой и удобный веб‑конвертер валют, который позволяет быстро рассчитывать сумму в одной валюте в эквиваленте другой по актуальным курсам.

---

## 🚀 Особенности

🔄 Конвертация между 4 валютами — быстро и удобно

💵💶💷💴 Поддержка популярных валют: USD, EUR, GBP, RUB

🌐 Автоматическое получение курсов из внешнего API

⚠️ Обработка ошибок при неверном вводе данных

---

## 💻 Использование

💱 Выберите валюту, из которой хотите конвертировать

💰 Выберите валюту, в которую хотите конвертировать

🔢 Введите сумму для конвертации

✅ Нажмите «Конвертировать» — и получите результат

---

## 🛠 Технологии

🌐 HTML5 / CSS3 — современная структура и стиль

⚡ JavaScript (ES6+) — динамика и интерактив

💱 Fetch API — получение актуальных курсов валют

📱 Адаптивная верстка — корректное отображение на любых экранах

---

## 🔮 Планы на будущее

📝 История конвертаций — сохранение предыдущих операций

🪙 Поддержка криптовалют — добавление популярных цифровых валют

📊 Графики изменений курса — наглядная динамика валют

⏱️ Автообновление курсов — обновление каждые N минут

---

## ⚠️ Ограничения

- Курсы могут не быть абсолютно точными — это зависит от API.
- Нет офлайн-режима — нужен интернет для получения курсов.

---


## 💻 Разработка приложения

<p>
При разработке данного проекта были использованы следующие инструменты и технологии:
</p>

![css/html/javascript](https://github.com/DennyMaverick/Archee/raw/main/img-readme/bages/2.svg)
![bem-naming](https://github.com/DennyMaverick/Archee/raw/main/img-readme/bages/4.svg)

<p>
 Начало было положено на интенсиве школы WebCademy в 2021 году. Благодарю Юрия за обучающее видео.

Далее, мной было усовершенствовано следующее:

🎨 Полностью обновлённый дизайн: самостоятельно подобрана цветовая палитра, шрифты и расположение элементов на странице для ПК, планшетов и мобильных устройств.

🌗 Смена темы: светлая, тёмная и «лунная» тема с плавным переходом цветов. Тема сохраняется при выходе из браузера и повторном входе благодаря localStorage.

🌐 Смена языка: поддержка русского и английского языков.

🔄 Двусторонняя конвертация валют: теперь можно конвертировать не только из рублей в доллары, евро и фунты, но и обратно.

⏳ Прелоадер: при загрузке страницы пользователь видит в центре экрана GIF с вращающейся монеткой.

📱 Адаптивность: интерфейс полностью подстроен под планшеты и мобильные устройства.


При разработке проекта были использованы следующие инструменты и технологии:

🖥️ VS Code — основной редактор кода

🌐 HTML5 / 🎨 CSS3 / ⚡ JavaScript

🧹 normalize.css — выравнивание стилей по разным браузерам

✨ Prettier — автоматическое форматирование кода

### Особенности проекта:

Проект имеет свои особенности, которые могут сразу не бросаться в глаза:

- При разрешении экрана меньше 768 px кнопка «Выбрать тему» (или «Change theme») сокращается до «Тема» (или «Theme»). Эта смена происходит в реальном времени при изменении размеров окна браузера благодаря событию JavaScript resize. Особенностью реализации стала необходимость корректного переключения языков. Динамическое изменение текста кнопки достигается с помощью значения hash в URL (ru / en) в зависимости от выбранного языка (по умолчанию — русский), а также через дополнительные объекты langsShort и langsLong, в которых хранятся соответствующие надписи.

```
  const langsShort = {
    ru: "тема",
    en: "theme",
  }

  const langsLong = {
    ru: "выбрать тему",
    en: "change theme",
  }
```

  И, в зависимости от значения hash, выполняется подстановка надписи в элемент кнопки:

```

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

```

- При выборе валюты, кликая на кнопки, происходит динамическая замена надписей в зависимости от выбранной валюты. Возникла сложность, как это реализовать, чтобы перевод корректно работал. Было следующее решение, записать в объект с текущим состоянием выбранного языка:

```
const langCurrentStates = {
  startState: hash,
}
```
И, в зависимости от этого значения, выполнять замену надписей в окошках, где прописывается, какая валюта берется, и какая получается в итоге:

```
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
```

- Также возникла сложность с подсветкой активной валюты в окнах ввода и вывода, для каждой темы эта подсветка должна по задуманной идее быть уникальна, своего цвета. Выход нашелся, создать объект с состоянием текущей темы и через шаблонные строки добавлять нажатой кнопке класс, который имел свойства, подходящие под дизайн текущей кнопки, в соответствии с выбранной темой, при этом, при клике удалять все классы других тем:

```
const activeTheme = localStorage.getItem("theme")

const activeThemeStates = {
  currentTheme: `${activeTheme}`,
}

OutputCoinItems.forEach(function (item) {
      item.classList.remove("output-coin--active", "output-coin--active-light", "output-coin--active-dark", "output-coin--active-moon")
    })

this.classList.add("output-coin--active", `output-coin--active-${activeThemeStates.currentTheme}`)
```

- При выборе входной валюты и выходной, если они одинаковы, окошко с вводом затемняется, и становится недоступным для ввода. Это сделано благодаря созданным объектам состояний, куда помещается текущее значение кликнутой кнопки валюты:

```
const inputValuesState = {
  value: "RUS",
}

const outputValuesState = {
  value: "USD",
}

(часть кода при клике в окне ввода:)

inputValuesState.value = event.target.dataset.coin

(часть кода при клике в окне вывода:)

outputValuesState.value = event.target.dataset.coin

if (inputValuesState.value === outputValuesState.value) {
      input.disabled = true
      input.style.backgroundColor = `${colorsThemesInputDisable.state}`
    } else {
      input.disabled = false
      input.style.backgroundColor = "#fff"
    }
```

Также этот инпут, что является неактивным, в зависимости от выбранной темы, имеет разный цвет при клике на кнопки с выбором вылюты или при клике на кнопки смены темы. Был создан объект с состоянием, куда был записан цвет в зависимости от выбранной темы:

```
const colorsThemesInputDisable = {
  state: "",
}

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
```

## ✉️ Обратная связь

Если вы нашли баг или хотите предложить новую фичу, пишите: den_maverick177@mail.ru

---

## 🔖 Лицензия

Все права защищены © 2025 **Denny Maverick**.
Никто не может копировать, изменять или распространять этот код без разрешения автора.

---

## 🙏 Благодарности

- API www.cbr-xml-daily.ru — за предоставление курсов валют
- Мои друзья / наставники за поддержку и идеи

###

</p>
