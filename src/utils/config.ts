import { ConfigService } from '@nestjs/config';

export const checkProduction = (
  configService: ConfigService,
  production: any,
  dev: any,
) => {
  return configService.get('NODE_ENV') === 'production' ? production : dev;
};
