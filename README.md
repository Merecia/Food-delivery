# Видео

> Ссылка на видео на YouTube: https://youtu.be/3uIkfu_7Sv0

# Как запустить?

### Шаг 1 – Создать базу данных в MongoDB Atlas. 

Инструкцию как создать базу данных в Mongo DB Atlas можно найти по этой [ссылке](https://jinv.ru/MongoDB-and-Mongoose/sozdanie-bazy-dannyh-v-oblachnom-servise-mongodb-atlas/)

Создать файл .env в директории server, указать URL для соединения с базой данных в этом файле. Обратите внимание, что вместо \<password\> нужно указать ваш пароль. В директории server есть файл .env.test – это шаблон, как нужно заполнять файл .env.

![image](https://github.com/Merecia/Food-delivery/assets/100159653/44ef2a24-7543-4a99-9184-0f7da56d26e3)

### Шаг 2 – Зарегистрироваться в системе [Stripe](https://stripe.com/)

Создать файл .env в директории client, заполнить этот файл по шаблону из файла .env.test, который находится в директории client.

Перейти по [ссылке](https://dashboard.stripe.com/test/apikeys) и найти там API keys. Добавить в файлы .env в директориях client и server API keys как показано на рисунке.

![image](https://github.com/Merecia/Food-delivery/assets/100159653/2c0b0e6c-8a6c-4ef9-a8b6-061c525aad7b)

### Шаг 3 – Установить необходимые npm пакеты. 

Если у вас не установлен Node JS, его надо установить. Сделать это можно на [официальном сайте](https://nodejs.github.io/nodejs.dev/en/download/) Node JS.

Перейдите в директорию server, откройте терминал в ней. 
Выполните такие команды в терминале:

```sh
npm install
npm run start
```

Перейдите в директорию client, откройте терминал в ней.
Выполните такие команды в терминале:

```sh
npm install 
npm run dev
```

Перейдите по этой ссылке в браузере: 

```sh
http://localhost:5173/
```
