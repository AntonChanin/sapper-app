# Приложение сапёр

## Постановка

Требуется реализовать игру "сапёр" согласно правилам, описанным ниже. Это должно быть приложение, с экраном настройки игры и таблицей лидеров. Таблица лидеров и игра должны иметь разные адреса (распологаться на разных роутах).

На экране настройки должен быть выбор уровня сложности

    Простой 8x8, 10 мин
    Средний 16x16, 40 мин
    Сложный 32x16, 100 мин

На экране игры должны быть таймер, счетчик "общее количество мин минус количество флажков", кнопка перезапуска игры и кнопка возврата на экран настроек. Ранее открытые клетки не должно быть можно переоткрыть. Если игрок проигрывает, то игра и таймер должны останавливаться, клетки становться некликабельными.

Таблица результатов должна содержать 10 игроков с наименьшим временем решения игры, отсортированные по возрастанию

Приложение должно быть красиво оформлено и нормально работать на устройствах с шириной экрана от 320px, должны быть проработаны краевые ситуации и сделана обработка ошибок
Не обязательно, но будет плюсом

    Реализация обработки средней кнопки мыши
    Реализация такой генерации мин, чтобы при первом ходе невозможно было проиграть
    Автоматический выигрыш, если открыты все клетки, на которых нет мин
    Кастомный режим, с пользовательским размером поля и количеством мин

## Стек

    React.js
    Redux или любой другой стейт-менеджер (для таблицы рекордов. Данные должны подгружаться и сохраняться в Local Storage)
    Можно использовать Next
    Можно использовать TypeScript
    Можно использвать сторонний UI Kit (bootstrap и тд)
    Можно использовать сторонние библиотеки для упрощения работы с данными
    Запрещается использовать сторонние библиотеки или код, реализующий логику игры

## Описание возможностей

Игровое поле - прямоугольник из клеток. В начале игры все клетки "закрыты" - на них ничего нет. В начале игры мины проставляются случайным образом под клетки, не показываясь игроку

Игрок может кликом левой кнопки мыши на любую неоткытую клетку открыть ее, правила открытия клеток:

    Если в клетке мина, то игрок проигрывает
    Если в сосеедних 8 клетках, граничахих с ней хотябы углом, есть хоть одна мина, то клетка покажет число мин в этих клетках
        Цифра должна иметь цвет, зависящий от числа мин вокруг: 1 — синяя, 2 — зелёная, 3 — красная, 4 — тёмно-синяя 5 — коричневая 6 — бирюзовая 7 — чёрная 8 — белая
    Если первые два условия не выполнены, то клетка автоматически открывает все восемь клеток вокруг себя и остаются пустой. Так клетки открываться должны, пока не дойдут до границы игрового поля либо не наткнутся на клетки, под которыми будут цифры

Игрок правой кнопкой мыши может поставить метку на неоткытую клетку. Доступные метки: "флажок", "вопросик" и без метки, меняются циклически

Если все поля либо открыты, либо помечены флажками, а на счетчике 0, то игрок побеждает

(Необязательно) Зажав среднюю кнопку мыши на открытой клетке с цифрой, игрок может "подсветить" 8 клеток вокруг него. Если кнопка отпущена менее, чем через 1 секунду после нажатия, а вокруг клетки флажков столько же, сколько должно быть мин, то все не помеченные флажками неоткрытые клетки открываются, даже если флажки расставлены ошибочно

# Реализация

Демо: https://sensational-paprenjak-b15e67.netlify.app/

## Стек

- TS
- React
- React-Router
- Vite
- MobX
- TailwindCSS

## Характеристики

\+ Таблица рекордов (отдельный роут)  
\+ Игровое поле (отдельный роут)  
\+ Панель настроек (отдельный роут)  
\+ Указания имя пользователя (под которым регестрируемся в таблицу рекордов)  
\+ Уровни сложности  
\+ Кастомный уровень сложности  
\+ Цветовая шкала "опасности" клетки  
\+ Файл конфигурации приложения с глубокой кастомизацией  
\+ Звуковые эффекты (текущие пути поддерживаюся только локально)  
\+ Счетчик флажков  
\+ Таймер  
\+ Кнопка рестарт  
\+ Использование локального хранилища для рекордов, сложности (кастомной и текущей), имени пользователя

\- Не полная поддержка звука (нет кастомизации в демо)  
\- Не реализованна поддержка оси Y  
\- Не реализован FTUE (генерации мин, чтобы при первом ходе невозможно было проиграть)  
\- Не реализован автоматический выигрыш, если открыты все клетки, на которых нет мин  
\- Не реализована "подсветка" на зажатия колеса мыши  
\- Установка параметров текущей сложности не полностью синхронизирована с кнопками переключения сложности

# Дальнейшие предлогаемые шаги

- Выполнения задач из списка с "-"
- Использование самописного сервера (NodeJS + express.js) со статическими данными вместо локального хранилища
- Использование манипуляций с файловой системой вместо локального хранилища
- Разбиение логических блоков прилажения на view и model
- Упаковка приложения в Electron

## Патч первого дня

- Звук по умолчанию добавлен в демо
- Код стайл рефакторинг

## 01.03.2023

- Поддержка Y
- Генератор случайных параметров для пользовательской сложности
- Кнопка сброса хранилища
- Реализован автоматический выигрыш, если открыты все клетки, на которых нет мин
- Добавленно представление таймера
- Баг: не всегда засчитывается победа
- Баг: Y может быть пустой и тогда на экране игры бесконечный цикл

## 02.03.2023

- Перенос логики поля в модель
- Добавлено представление поля
- Баг "не всегда засчитывается победа" пофикшен
- Баг: не поддерживает отображение вопроса

## 03.03.2023

- Баг "не поддерживает отображение вопроса" пофикшен
