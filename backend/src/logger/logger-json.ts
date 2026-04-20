import { Injectable } from '@nestjs/common';

import { CustomLogger } from './logger-custom';

@Injectable()
export class JsonLogger extends CustomLogger {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    return JSON.stringify({ level, message, optionalParams });
  }
}
