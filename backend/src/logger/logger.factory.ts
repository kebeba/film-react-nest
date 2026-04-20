import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';

import { DevLogger } from './logger-dev';
import { JsonLogger } from './logger-json';
import { TskvLogger } from './logger-tskv';

export enum LogFormat {
  Dev = 'DEV',
  Json = 'JSON',
  Tskv = 'TSKV',
}

export function createLogger(configService: ConfigService): LoggerService {
  const logFormat = configService.get<LogFormat>('LOG_FORMAT', LogFormat.Dev);

  switch (logFormat) {
    case LogFormat.Json:
      return new JsonLogger();
    case LogFormat.Tskv:
      return new TskvLogger();
    case LogFormat.Dev:
      return new DevLogger();
    default:
      return new DevLogger();
  }
}
