import { Module, Global } from '@nestjs/common';

import {
  APP_ENVIRONMENT_TOKEN,
  APP_KEY_TOKEN,
  environment,
} from './providers/app.constant';
import { apiKeyFactory } from './providers/factory.provider';

@Global()
@Module({
  providers: [
    {
      provide: APP_ENVIRONMENT_TOKEN,
      useValue: environment,
    },
    {
      provide: APP_KEY_TOKEN,
      useFactory: apiKeyFactory,
      inject: [APP_ENVIRONMENT_TOKEN],
    },
  ],
  exports: [APP_KEY_TOKEN],
})
export class CoreConfigModule {}
