# СURRENCY CONVERTER - Конвертер валют

![main pic](https://github.com/DennyMaverick/Convertation_project/raw/main/img-readme/3-moon.png)

###

 👋 Привет!
<p>
При разработке данного проекта были использованы следующие инструменты и технологии:
</p>

![css/html/javascript](https://github.com/DennyMaverick/Archee/raw/main/img-readme/bages/2.svg)
![bem-naming](https://github.com/DennyMaverick/Archee/raw/main/img-readme/bages/4.svg)

<p>
 Начало было положено на интенсиве школы WebCademy в 2021 году. Благодарю Юрия за обучающее видео.

Далее, мной было усовершенствовано следующее:

<ul>
 <li>Полностью изменен дизайн, самостоятельно подобрана цветовая палитра, шрифт и расположение элементов на странице в версии для ПК, планшетов и мобильных устройств;</li>
 <li>Полностью изменен дизайн, самостоятельно подобрана цветовая палитра, шрифт и расположение элементов на странице в версии для ПК, планшетов и мобильных устройств;</li>
 <li>Добавление возможности смены темы: на светлую, темную и лунную. Смена цветов плавная, а также при выходе из браузера и входе заново, — тема сохраняется, это достигнуто благодаря local storage;</li>
 <li>Добавление функции смены языка: на русский или английский;</li>
 <li>В изначальном проекте конвертация валют была возможна только в одном направлении: рубль конвертировался в доллары, евро и фунты стерлингов, сейчас конвертация возможна в двустороннем направлении;</li>
 <li>Добавлен прелоадер (когда страница еще не подгружена, пользователь видит в центре экрана изображение - gif с вращающейся монеткой);</li>
 <li>Адаптив под планшеты и мобильные устройства.</li>
</ul> 

При разработке проекта были использованы следующие инструменты и технологии:

<ul>
 <li>Редактор кода VS Code;</li>
 <li>HTML5 / CSS3 / JS;</li>
 <li>normalize.css;</li>
 <li>Prettier;</li>
</ul> 
  
### Особенности и тонкости проекта:
  
Проект имеет свои особенности, которые могут сразу не бросаться в глаза:
    
- При разрешении экрана меньше 768 px кнопка 'Выбрать тему' или 'Chenge theme' превращается просто в 'Тема' или 'Theme'. При этом, это будет происходить при ресайзинге окна браузера в реальном времени. Это сделано благодаря событию javascript 'resize', при этом возникла сложность, с переключением языков. Динамическое изменение надписи было достигнуто благодаря установленному значению hash в строке поиска (ru / en) в зависимости от выбранного языка (по умолчанию это русский) а также дополнительным объектам langsShort и langsLong, в которых хранятся надписи:
  
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




Время на выполнение данного проекта — приблизительно 3 дня или 18 часов непрерывной работы.

На проект можно посмотреть здесь: https://dennymaverick.github.io/Convertation_project 
Увидимся!✋🏻😊
</p>
