import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(
    level: string,
    message: any,
    context?: string,
    optionalParams?: any[],
  ): string {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      context: context || 'Application',
      message: typeof message === 'object' ? JSON.stringify(message) : message,
      ...this.formatOptionalParams(optionalParams),
    };

    return JSON.stringify(logEntry);
  }

  private formatOptionalParams(params?: any[]): Record<string, any> {
    if (!params || params.length === 0) return {};

    const result: Record<string, any> = {};
    params.forEach((param, index) => {
      result[`param${index + 1}`] = param;
    });
    return result;
  }

  log(message: any, context?: string, ...optionalParams: any[]) {
    console.log(this.formatMessage('log', message, context, optionalParams));
  }

  error(
    message: any,
    trace?: string,
    context?: string,
    ...optionalParams: any[]
  ) {
    const formattedMessage = this.formatMessage('error', message, context, [
      trace,
      ...optionalParams,
    ]);
    console.error(formattedMessage);
  }

  warn(message: any, context?: string, ...optionalParams: any[]) {
    console.warn(this.formatMessage('warn', message, context, optionalParams));
  }

  debug(message: any, context?: string, ...optionalParams: any[]) {
    console.debug(
      this.formatMessage('debug', message, context, optionalParams),
    );
  }

  verbose(message: any, context?: string, ...optionalParams: any[]) {
    console.log(
      this.formatMessage('verbose', message, context, optionalParams),
    );
  }

  // Для NestJS 9+ нужно также реализовать fatal
  fatal(message: any, context?: string, ...optionalParams: any[]) {
    console.error(
      this.formatMessage('fatal', message, context, optionalParams),
    );
  }
}
