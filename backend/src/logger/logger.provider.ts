import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

import { createLogger } from './logger.factory';

export const LoggerProvider: Provider = {
  provide: 'APP_LOGGER',
  useFactory: (configService: ConfigService) => createLogger(configService),
  inject: [ConfigService],
};
