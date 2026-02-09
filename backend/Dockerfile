FROM node:20 AS builder
WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем проект
RUN npm run build

# Production образ
FROM node:20
WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --only=production

# Копируем собранный код из builder
COPY --from=builder /app/dist ./dist

# Указываем порт
EXPOSE 3000

# Запускаем приложение - правильный путь!
CMD ["node", "dist/main.js"]