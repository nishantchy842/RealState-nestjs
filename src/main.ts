import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { MyLogger } from './config/logger';
import { useSwagger } from './config/swagger.config';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLogger(),
  });

  app.setGlobalPrefix('api');

  const config = app.get(ConfigService);

  const port = config.get('PORT');

  const NODE_ENV = config.get('NODE_ENV');

  app.use(helmet());

  // Enable CORS for specific origins
  app.enableCors({
    origin: 'http://localhost:5173', // Add your frontend origin(s) here
    // origin: 'http://localhost:4173',
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
  });

  if (NODE_ENV !== 'production') {
    useSwagger(app);
  }

  await app.listen(port, () => {
    Logger.verbose(`server is running on port ${port}`);
  });
}
bootstrap();
