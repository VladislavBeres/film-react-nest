import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatEntry(
    level: string,
    message: any,
    context?: string,
    ...params: any[]
  ): string {
    const entries: string[] = [];

    // Обязательные поля
    entries.push(`time=${new Date().toISOString()}`);
    entries.push(`level=${level}`);
    entries.push(`message=${this.stringifyValue(message)}`);

    if (context) {
      entries.push(`context=${context}`);
    }

    // Дополнительные параметры
    params.forEach((param, index) => {
      if (param) {
        entries.push(`param${index + 1}=${this.stringifyValue(param)}`);
      }
    });

    return entries.join('\t') + '\n';
  }

  private stringifyValue(value: any): string {
    if (value === undefined) return 'undefined';
    if (value === null) return 'null';
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    return String(value);
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    console.log(this.formatEntry('log', message, context, ...optionalParams));
  }

  error(
    message: any,
    trace?: string,
    context?: string,
    ...optionalParams: any[]
  ) {
    const formatted = this.formatEntry(
      'error',
      message,
      context,
      trace ? `Trace: ${trace}` : '',
      ...optionalParams,
    );
    console.error(formatted);
  }

  // Реализовать остальные методы по аналогии...
  warn(message: any, context?: string, ...optionalParams: any[]) {
    console.warn(this.formatEntry('warn', message, context, ...optionalParams));
  }

  debug(message: any, context?: string, ...optionalParams: any[]) {
    console.debug(
      this.formatEntry('debug', message, context, ...optionalParams),
    );
  }

  verbose(message: any, context?: string, ...optionalParams: any[]) {
    console.log(
      this.formatEntry('verbose', message, context, ...optionalParams),
    );
  }

  fatal(message: any, context?: string, ...optionalParams: any[]) {
    console.error(
      this.formatEntry('fatal', message, context, ...optionalParams),
    );
  }
}
