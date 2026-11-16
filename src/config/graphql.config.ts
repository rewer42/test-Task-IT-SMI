import { isDev } from '@common/utils/is-dev.util.js';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

export function getGraphQLConfig(
  configService: ConfigService,
): ApolloDriverConfig {
  return {
    graphiql: false,
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    playground: isDev(configService),
    path: configService.getOrThrow<string>('GRAPHQL_PREFIX'),
    autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    sortSchema: true,
  };
}
