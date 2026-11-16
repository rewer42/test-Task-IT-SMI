import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { ProfileModule } from '@Profile/profile.module.js';
import { IS_DEV_ENV } from '@common/utils/is-dev.util.js';
import { getGraphQLConfig } from './config/graphql.config.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: !IS_DEV_ENV,
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [ConfigModule],
      useFactory: getGraphQLConfig,
      inject: [ConfigService],
    }),
    ProfileModule,
  ],
  providers: [],
})
export class AppModule {}
