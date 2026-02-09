import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { LoggerFactory } from './logger/logger.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, // Важно: буферизуем логи до подключения логгера
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  // Используем фабрику для создания логгера
  const logger = LoggerFactory.createLogger();
  app.useLogger(logger);

  await app.listen(3000);

  // Логируем старт приложения
  logger.log(`Application is running on: ${await app.getUrl()}`);
  logger.log(`Log format: ${process.env.LOG_FORMAT || 'dev'}`);
  logger.log(`Database: ${process.env.DATABASE_URL}`);
}
bootstrap();
