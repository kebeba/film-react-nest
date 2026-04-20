import { Injectable } from '@nestjs/common';

import { CustomLogger } from './logger-custom';

@Injectable()
export class TskvLogger extends CustomLogger {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const loggerLine = [
      `logLevel: ${JSON.stringify(level)}`,
      `message: ${JSON.stringify(message)}`,
      `params: ${JSON.stringify(optionalParams)}`,
    ];
    return loggerLine.join('\t');
  }
}
