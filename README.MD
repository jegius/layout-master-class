## Установка Storybook в проект на простом HTML

Эта инструкция поможет вам установить Storybook на ваш проект на простом HTML и настроить тестовый пример с компонентом Button со стилями.

### Шаг 1: Создание проекта

1. Создайте новую папку для вашего проекта.
2. Внутри этой папки создайте файл `index.html`.

### Шаг 2: Установка зависимостей

1. Откройте ваш проект в командной строке или терминале.
2. Убедитесь, что у вас установлен Node.js.
3. Введите следующую команду для инициализации нового проекта:

   ```bash
   npm init -y
   ```

4. Установите Storybook:

   ```bash
   npx storybook@latest init
   ```
5. В консоле появится вопрос  `Do you want to manually choose a Storybook project type to install?` жмем `Y`
6. В консоле появится выбор компонентов `Please choose a project type from the following list:` стрелочками выбираем `web_components`
7. В консоле появится вопрос `We were not able to detect the right builder for your project. Please select one:` выбираем `Vite`

   Эта команда создаст файлы и папки, необходимые для настройки Storybook.
### Шаг 3: Настройка Storybook

1. Откройте файл `.storybook/main.js` в вашем редакторе кода.
2. Убедитесь, что конфигурация выглядит следующим образом:

   ```javascript
   const config = {
      stories: ["../stories/**/*.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
      addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
      framework: {
      name: "@storybook/web-components-vite",
      options: {},
      },
      docs: {
       autodocs: "tag",
      },
   };
   export default config;

   ```
3. Проверяем файл `preview.js` тут регистриются файлы которые необходимые для отображения story

   ```javascript
   const preview = {
      parameters: {
         actions: { argTypesRegex: "^on[A-Z].*" },
         controls: {
            matchers: {
               color: /(background|color)$/i,
               date: /Date$/,
            },
         },
      },
   };
   
   ```
3. Изучаем папку `stories` - тут сгенерированны примеры создания компонентов со `stories`
4. Создайте папку `src` и в ней папку `components`.
5. Здесь создаем файл `common.css` куда будут складироваться css переменные
6. Внутри папки `components` создайте директорию с названием компонента (так как мы делаем стори для компонента button у нас надо создать директорию button)
7. Тут же создаем файл `button-component.styles.js` в который переносим все стили нашего компонент который мы переносим из своей версти
```javascript
export default `
    <style>
        @import url('../common.css');
        
        input {
            margin: 0;
            padding: 0;
            border: none;
            outline: none;
            background: none; /* убирает серую подсветку при активации в некоторых браузерах */
            -webkit-appearance: none; /* убирает стили браузера в Chrome и Safari */
            -moz-appearance: none; /* убирает стили браузера в Firefox */
            appearance: none; /* убирает стили браузера для остальных */
        }
        
        .header__contact-button {
            text-transform: uppercase;
            color: var(--white);
            background-color: var(--blue);
            padding: 1.5rem 2.5rem;
            border-radius: 10rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 0 0 0;
            transform: scale(1);
            transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;
        }
        
        .header__contact-button:hover {
            transform: scale(.95);
            box-shadow: 0 0 1rem var(--blue);
        }
        
    </style>
`;

```
8. Импортируем сюда `сommon.css`
9. директории `button` создаем файл `button-component.js` и копируем сюада код.

```javascript
   import template from "./button-component.template.js";

export class ButtonComponent extends HTMLElement {
   static get name() {
      return "button-component";
   }

   constructor() {
      super();
      this.attachShadow({ mode: "open" });
   }

   connectedCallback() {
      this.#render();
   }

   #render() {
      const templateElem = document.createElement("template");
      templateElem.innerHTML = template;
      this.shadowRoot.appendChild(templateElem.content.cloneNode(true));
   }
}

```

Что именно здесь происходит сейчас мы не разбираем, копируем как есть. Меняем только вещи 
связанные с именем компонента:
- `class ButtonComponent` - название нашего элемента в формате Название компонета + Component (Например NavComponent, LinkCompontne и т.д.)
- `static get name() {
  return "button-component";
  }` строку `button-component` меняем на название нашего компонента (Например nav-compnent, link-component)

10. Создаем файл `button-component.template.js` это наш темплейт где будет содержаться `html`
```javascript
import styles from "./button-component.styles.js";

export default `
    ${styles}
    <input type="button" class="header__contact-button" value="contact us">
`;

```
Сюда импортируем стили из `button-component.styles.js`

11. В файле `button-component.stories.js` добавьте следующий код:

  ```javascript
   import { html } from "lit-html";
   import "./button-component.js";
   import { ButtonComponent } from "./button-component.js";
   import "./button-component.template.js";
   import "./button-component.styles.js";
   import "../common.css";
   
   export default {
      title: "ButtonComponent",
      tags: ["autodocs"],
   };
   
   const Template = () => {
      return html`
       <button-component></button-component>
     `;
   };
   
   export const Default = Template.bind({});
  ```
Стори бук автоматически подхватит наш компонент, но он еще не отобразится, чтобы отобразился нужно его зарегистрировать
12. Переходим в файл `preview.js` и добавляем строчку с регистрацией нашего компонента
```javascript

[
  ButtonComponent,
].map((component) => customElements.define(component.name, component));
```
ВАЖНО! ButtonComponent должен быть импортирован в файл `preview.js`, проверь что
у тебя есть строчка в импортах `import {ButtonComponent} from '../components/button/button-component';`

### Шаг 4: Запуск Storybook

1. В командной строке или терминале введите следующую команду:

   ```bash
   npm run storybook
   ```

2. Откройте браузер и перейдите по адресу `http://localhost:6006`, чтобы увидеть запущенный Storybook и кнопку Button.

Теперь ваш проект настроен для работы с Storybook и содержит тестовый пример с кнопкой Button.

Вы можете добавить новые истории в файле `button-component.stories.js` для представления других вариантов кнопки или создать новые компоненты и истории в папке `src/components`.

Поздравляю! Теперь вы можете использовать Storybook для разработки и демонстрации своих компонентов HTML в изолированной среде.