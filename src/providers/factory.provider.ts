import { environment } from './app.constant';

export const apiKeyFactory = (env: typeof environment): Promise<string> => {
  return new Promise((resolve, _reject) => {
    console.log(`Factory provider called to generate API key: ${env.isDev}`);
    if (env.isDev) {
      resolve('development-key-67890');
      return;
    }
    resolve(env.defaultKey);
  });
};
