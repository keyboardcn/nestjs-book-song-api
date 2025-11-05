import { Logger } from '@nestjs/common';
import { environment } from './app.constant';

export const apiKeyFactory = (env: typeof environment): Promise<string> => {
  const logger = new Logger('FactoryProvider');
  return new Promise((resolve, _reject) => {
    logger.log(`Factory provider called to generate API key: ${env.isDev}`);
    if (env.isDev) {
      resolve('development-key-67890');
      return;
    }
    resolve(env.defaultKey);
  });
};
