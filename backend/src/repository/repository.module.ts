import { Module } from '@nestjs/common';
import mongoose from 'mongoose';

import { AppConfig, configProvider } from 'src/app.config.provider';
import { FilmsRepository } from './films.repository';

const mongoProvider = {
  provide: 'MONGO_CONNECTION',
  useFactory: async (config: AppConfig) => {
    const connection = await mongoose.connect(config.database.url);
    return connection;
  },
  inject: ['CONFIG'],
};

@Module({
  providers: [configProvider, mongoProvider, FilmsRepository],
  exports: [FilmsRepository],
})
export class RepositoryModule {}
