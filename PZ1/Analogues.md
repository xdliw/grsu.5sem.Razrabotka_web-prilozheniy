# Аналоги приложений для Практического задания 1

Проект: "Крокодил-онлайн" — веб-игра, где один игрок рисует загаданное слово, а остальные угадывают его в чате.

Ниже — 4 существующих веб-ресурса той же тематики (не мобильные приложения, а именно браузерные игры), и технический аудит по ним по схеме из задания.

---

## 1. skribbl.io

- **Адрес:** https://skribbl.io/
- **Архитектура/логика:** серверная часть построена на Node.js с фреймворком Express, перед которым стоит веб-сервер nginx (вероятно, в роли реверс-прокси). Транспорт реального времени: WebSocket с использованием библиотеки Socket.IO.js.
- **Семантические элементы HTML5:** Нет.
- **Семантические классы div:** Много различных, но, например, "panels", "footer", "tos".
- **Адаптивность:** в описании обновления сайта явно заявлена "Mobile support" (редизайн 2022 года), viewport настроен с `user-scalable=no` — сайт точно думает про мобильные экраны. Медиа запросы: @media (max-aspect-ratio:1) - для вертикальной ориентации экрана устройства, @media (min-aspect-ratio:1) and (max-width:1166px).
- **Lighthouse:** условия проверки: мобильный интернет находясь в университете. Результат в отдельном .pdf файле.
- **LocalStorage/Cookies:** сайт запоминает ник, аватар, громкость и другие настройки между визитами. Используется и LocalStorage, и Cookies.
- **Маркетинг/аналитика:** На сайте есть реклама, в Network есть https://www.googletagmanager.com/gtag/js?id=G-YB9N45W3N0, https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js

## 2. gartic.io

- **Адрес:** https://gartic.io/
- **Архитектура/логика:** в мета-тегах явно присутствует `next-head-count` — это стандартный признак **Next.js** (то есть React-фреймворка). Авторизация через OAuth: Twitter, Google, VK, Discord. На странице виден явный рекламный блок ("Reklam. Zəhmət olmasa, gözləyin..." — азерб. "Реклама, подождите, пожалуйста"). Есть свои приложения под Android/iOS.
- **Семантические элементы HTML5:** Отсутствуют.
- **Семантические классы div:** Много различных, но, например, "content", "home", "avatar", "actions".
- **Адаптивность:** viewport настроен и под мобильные (`interactive-widget=resizes-content`). Медиа запросы: @media screen and (max-height:753px),screen and (max-width:1329px); @media screen and (max-height:641px),screen and (max-width:1151px); @media screen and (max-height:753px),screen and (max-width:1170px); @media screen and (max-height:641px),screen and (max-width:1010px); @media screen and (max-height:809px),screen and (min-width:641px) and (max-width:1279px); @media screen and (max-width:640px); @media screen and (max-width:640px) and (max-device-width:568px); @media screen and (max-width:640px) and (min-height:570px); @media screen and (max-width:640px) and (min-aspect-ratio:13/16), и еще несколько.
- **Lighthouse:** условия проверки: мобильный интернет находясь в университете. Результат в отдельном .pdf файле.
- **LocalStorage/Cookies:** хранит токены OAuth-сессии, выбранную тему/язык. Использует Cookies.
- **Маркетинг/аналитика:** реклама подтверждена визуально на странице. Инструменты: https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=D15D08BC77UBFUIIG3Q0&lib=ttq, https://static.cloudflareinsights.com/beacon.min.js/v31edd6df95cf4e85bb4c19e7a9bdbcba1788362987495, https://www.googletagmanager.com/gtag/js?id=UA-3906902-31, https://api.adinplay.com/libs/aiptag/pub/GTC/gartic.io/tag.min.js

## 3. drawasaurus.org

- **Адрес:** https://drawasaurus.org/
- **Архитектура/логика:** тоже собран на **Next.js** (тот же признак `next-head-count`), полноценное SPA — страница явно требует JS ("Sorry, you need JavaScript enabled to play this game!") и не работает без него вообще.
- **Семантические элементы HTML5:** (формат: тег - количество) header - 1, main - 1, footer - 1, aside - 1.
- **Семантические классы div:** Много различных, и, по всей видимости, они обфусцированы и не имеют смысла с точки зрения английского языка. Например, "c13p2ctf", "w1ezm46w", "hsi2xql".
- **Адаптивность:** viewport с `maximum-scale=1, user-scalable=no`. Медиа запросы для изменения отображения рекламы: @media (max-width: 400px) and (max-height: 550px), (max-height: 400px); @media (max-width: 799px); @media (min-width: 800px). Остальные медиа-запросы изменяют размер шрифта и ширину некоторых элементов: @media (min-width:700px); @media (max-width:350px); @media (min-width:1000px); @media (min-width:900px); @media (min-width:1200px); @media (max-height:350px),(max-width:350px); @media (min-width:470px); @media (min-width:550px). Брейкпоинты для height: 350px, 400px, 500px. Брейкпоинты для width: 350px, 400px, 470px, 550px, 700px, 800px, 900px, 1000px, 1200px.
- **Lighthouse:** условия проверки: мобильный интернет находясь в университете. Результат в отдельном .pdf файле.
- **LocalStorage/Cookies:** В Cookies хранятся: acceptedTerms, nickname, session.
- **Маркетинг/аналитика:** на странице явно видно два рекламных блока (подписаны "ADVERTISEMENT"). Конкретные инструменты: https://www.googletagmanager.com/gtag/js?id=G-EGZ0VY9TNZ, https://cdn.snigelweb.com/adengine/drawasaurus.org/loader.js.

## 4. drawize.com

- **Адрес:** https://drawize.com/
- **Архитектура/логика:** заголовки x-powered-by: ASP.NET, x-aspnetmvc-version: 5.3, x-aspnet-version: 4.0.30319 и пути /bundles/*.js?v=<хеш> указывают на бэкенд на ASP.NET MVC 5.3 (.NET Framework, C#) с использованием Bundling & Minification. Клиентская часть без явного фреймворка: скрипты сгруппированы в бандлы (comm, gameLibs, gamePlay, gameUI), локализация подгружается с сервера (translations.js?lang=en). Сайт находится за CDN Cloudflare (server: cloudflare, cf-cache-status: HIT, узел WAW), поддерживает HTTP/2 и HTTP/3. Транспорт реального времени: WebSocket.
- **Семантические элементы HTML5:** Отсутствуют.
- **Семантические классы div:** Например, "ad", "header-info", "homeButtonsWrapper".
- **Адаптивность:** заточен и под мобильные (есть отдельное приложение в Google Play/App Store + `mobile-web-app-capable`). Медиа-запросы: @media (-moz-platform: macos); @media (-moz-platform: windows) and (prefers-contrast); @media (prefers-reduced-motion); @media only screen and (max-width:767px); @media only screen and (max-width:1023px); @media only screen and (min-width:1250px); @media only screen and (max-width:1344px); и другие.
- **Lighthouse:** условия проверки: мобильный интернет находясь в университете. Результат в отдельном .pdf файле.
- **LocalStorage/Cookies:** на сайте есть явный баннер согласия на cookies с прямой формулировкой — использует cookies "to customize the content, analyze traffic, and display targeted ads" (персонализация контента, анализ трафика, таргетированная реклама). Это уже прямой признак использования аналитики и рекламных трекеров. Используются Cookies, LocalStorage, Indexed DB.
- **Маркетинг/аналитика:** подтверждено текстом баннера cookies + наличием `meta fb:app_id` (интеграция с Facebook) + платными тарифами Premium/Business/Classroom (монетизация не только рекламой, но и подпиской). Инструменты: https://www.googletagmanager.com/gtag/js?id=G-YZVR4M02RQ.

---

## Часть 3. Функциональный анализ — что взять в свой проект

| Функция | Где встречается | Приоритет для нашего проекта | Комментарий |
|---|---|---|---|
| Публичные и приватные комнаты | Все 4 | **Высокий** | Базовая механика, без этого игры не будет |
| Гостевой вход без регистрации | skribbl, drawasaurus, drawize | **Высокий** | Низкий порог входа; можно совместить с опциональной регистрацией (нужна для роли админа/статистики по заданию курса) |
| Выбор слова из нескольких вариантов | skribbl | **Высокий** | Несложно реализовать, сильно влияет на играбельность |
| Синхронный холст (Canvas) в реальном времени | Все 4 | **Высокий** | Ядро игры |
| Таймер раунда + постепенные подсказки (открытие букв) | skribbl, drawize | **Средний** | Хорошее дополнение, не критично для MVP |
| Пользовательские наборы слов (CRUD) | skribbl (custom words), drawize (word lists) | **Средний** | Хорошо ложится на требование курса про роль с CRUD-доступом |
| Модерация комнаты (кик/бан/жалоба) | skribbl | **Средний** | Полезно, но не блокирует MVP |
| OAuth-авторизация через соцсети | gartic.io | **Низкий** | Красиво, но для учебного проекта проще email/пароль или гостевой режим |
| Глобальные рейтинги/лидерборды вне комнаты | drawize | **Низкий** | Хорошая идея на будущее, не MVP |
| Реклама/монетизация/подписки | gartic, drawasaurus, drawize | **Не нужно** | Учебный проект без монетизации |
| AI-функции (оценка рисунка нейросетью) | drawize (CopyCatAI) | **Не нужно** | Избыточно для скоупа курсового задания |
| Мультиязычность интерфейса | skribbl, gartic | **Низкий** | Можно ограничиться русским (+опционально английским) |
| Адаптивность под мобильные | Все 4 | **Высокий** | Прямое требование задания (media-запросы) |
