FROM node:20 AS build
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Используем npm install с флагом для опциональных зависимостей
RUN npm install --legacy-peer-deps --omit=optional

# Копируем остальные файлы
COPY . .

# Принудительно устанавливаем проблемный пакет rollup
RUN npm install @rollup/rollup-linux-x64-gnu --no-save || true

# Собираем проект
RUN npm run build