import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { PhotoEntity } from 'src/uploads/entity/photo.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { checkProduction } from 'src/utils/config';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

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
    entities: [PostEntity, PhotoEntity, UserEntity],
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
