import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/uploads/entity/photo.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { checkProduction } from 'src/utils/config';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { EnvListType } from 'src/common/enums/env.type';
import { PostDetailsEntity } from 'src/posts/entities/postDetails.entity';
import { SavedPostEntity } from 'src/saved-post/entities/saved-post.entity';
import { ChatEntity } from 'src/chats/entities/chat.entity';
import { MessageEntity } from 'src/messages/entity/message.entity';

export const OrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host:
      configService.get('NODE_ENV') === 'production'
        ? configService.get('PD_POSTGRES_HOST')
        : configService.get('POSTGRES_HOST'),
    port: checkProduction(
      configService,
      +configService.get('PD_POSTGRES_PORT') ?? '',
      +configService.get('POSTGRES_PORT'),
    ),
    username: checkProduction(
      configService,
      configService.get('PD_POSTGRES_USERNAME'),
      configService.get('POSTGRES_USER'),
    ),
    password: checkProduction(
      configService,
      configService.get('PD_POSTGRES_PASSWORD'),
      configService.get('POSTGRES_PASSWORD'),
    ),
    database: checkProduction(
      configService,
      configService.get('PD_POSTGRES_DATABASE'),
      configService.get('POSTGRES_DATABASE'),
    ),
    entities: [
      PostEntity,
      PhotoEntity,
      UserEntity,
      PostDetailsEntity,
      SavedPostEntity,
      ChatEntity,
      MessageEntity,
    ],
    // entities: [join(__dirname, '*.entity{.ts,.js}')],
    synchronize: true,
    autoLoadEntities: true,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();

    if (dataSource) {
      Logger.verbose('🌨️  data base is connected');
    } else {
      Logger.error('Failed to connect database');
    }

    return dataSource;
  },
};

export const EnvList: EnvListType = {
  PORT: 'PORT',

  NODE_ENV: 'NODE_ENV',

  HOST: 'HOST',

  POSTGRES_HOST: 'POSTGRES_HOST',

  POSTGRES_PORT: 'POSTGRES_PORT',

  POSTGRES_USER: 'POSTGRES_USER',

  POSTGRES_PASSWORD: 'POSTGRES_PASSWORD',

  POSTGRES_DATABASE: 'POSTGRES_DATABASE',

  TOKEN_EXPIRATION: 'TOKEN_EXPIRATION',

  JWT_SECRET_KEY: 'JWT_SECRET_KEY',

  PD_POSTGRES_HOST: 'PD_POSTGRES_HOST',

  PD_POSTGRES_PORT: 'PD_POSTGRES_PORT',

  PD_POSTGRES_USERNAME: 'PD_POSTGRES_USERNAME',

  PD_POSTGRES_PASSWORD: 'PD_POSTGRES_PASSWORD',

  PD_POSTGRES_DATABASE: 'PD_POSTGRES_DATABASE',

  ENDPOINT_CORS: 'ENDPOINT_CORS',
};
