import { Injectable, ConsoleLogger, LogLevel } from '@nestjs/common';

@Injectable()
export class DevLogger extends ConsoleLogger {
  constructor(context?: string) {
    super(context);

    // Можно настроить цвета или форматирование
    this.setLogLevels(this.getLogLevels());
  }

  private getLogLevels(): LogLevel[] {
    // В зависимости от NODE_ENV можно менять уровень логирования
    if (process.env.NODE_ENV === 'production') {
      return ['log', 'error', 'warn'];
    }
    return ['log', 'error', 'warn', 'debug', 'verbose'];
  }

  // Можно переопределить методы для кастомного форматирования
  log(message: any, context?: string) {
    super.log(` ${message}`, context);
  }

  error(message: any, trace?: string, context?: string) {
    super.error(` ${message}`, trace, context);
  }
}
