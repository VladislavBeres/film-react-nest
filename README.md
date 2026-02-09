# FILM!

## Установка

### MongoDB

Установите MongoDB скачав дистрибутив с официального сайта или с помощью пакетного менеджера вашей ОС. Также можно воспользоваться Docker (см. ветку `feat/docker`.

Выполните скрипт `test/mongodb_initial_stub.js` в консоли `mongo`.

### Бэкенд

Перейдите в папку с исходным кодом бэкенда

`cd backend`

Установите зависимости (точно такие же, как в package-lock.json) помощью команд

`npm ci` или `yarn install --frozen-lockfile`

Создайте `.env` файл из примера `.env.example`, в нём укажите:

- `DATABASE_DRIVER` - тип драйвера СУБД - в нашем случае это `mongodb`
- `DATABASE_URL` - адрес СУБД MongoDB, например `mongodb://127.0.0.1:27017/practicum`.

MongoDB должна быть установлена и запущена.

Запустите бэкенд:

`npm start:debug`

Для проверки отправьте тестовый запрос с помощью Postman или `curl`.

# Работа с сервером

# Остановить все

docker-compose down

Остановить все и удалить контейнеры с данными

docker-compose down -v

# Удалить старые образы

docker rmi film-react-nest-backend film-react-nest-frontend film-react-nest-nginx

# Запуск базовой конфигурации

# Запуск production конфигурации

docker-compose -f docker-compose.prod.yml up -d

# Запуск базовой конфигурации

docker-compose -f docker-compose.yml up -d

# Пересоберить и запустить

# Запуск production с пересборкой

docker-compose -f docker-compose.prod.yml up -d --build

# Запуск базовой конфигурации с пересборкой

docker-compose -f docker-compose.yml up -d --build

# Добавь данные:

# Копировать SQL файлы

docker cp backend/test/prac.init.sql film-postgres:/tmp/init.sql
docker cp backend/test/prac.films.sql film-postgres:/tmp/films.sql
docker cp backend/test/prac.shedules.sql film-postgres:/tmp/schedules.sql

# Исправь schedules.sql

docker exec film-postgres sed -i "s/,''/,'{}'/g" /tmp/schedules.sql

# добавить в базу

docker exec film-postgres psql -U film_user -d film_db -f /tmp/init.sql
docker exec film-postgres psql -U film_user -d film_db -f /tmp/films.sql
docker exec film-postgres psql -U film_user -d film_db -f /tmp/schedules.sql

# К приложению можно получить доступ по ссылке

http://vladislav.student.nomorepartiessbs.ru/
