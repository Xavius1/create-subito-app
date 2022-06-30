import './security/open-telemetry';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginUsageReportingDisabled } from 'apollo-server-core';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFiles } from 'graphql-import-files';
import { Token } from 'subito-lib';
// Uncomment the next 2 lines if you need MongoDB connector
// import { MongoDBConnector } from 'subito-connector-mongodb';
// import SubitoApps from './repositories/SubitoApp/SubitoApps';
// Uncomment the next line if you need a service
// import SubitoAppService from './services/SubitoApp/SubitoAppService';
import e from './security/env';
import resolvers from './graphql/resolvers/index';
(async () => {
  // Uncomment this code if you need a MongoDB connection
  // const db = await new MongoDBConnector(
  //   e.MONGODB_MAIN_LINK,
  //   e.MONGODB_MAIN_NAME,
  //   {
  //     authSource: e.MONGODB_MAIN_AUTH,
  //     replicatSet: e.MONGODB_MAIN_REPLICASET,
  //   },
  // ).connect();

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{
      typeDefs: loadFiles('./graphql/schemas/*.gql'),
      resolvers,
    }]),
    plugins: [
      ApolloServerPluginUsageReportingDisabled(),
    ],
    // dataSources will be available into the context from resolvers layer
    dataSources: () => ({
      // Uncomment the next 3 lines if you need a repository
      // SubitoApps: new SubitoApps(
        // db.collection(e.MONGODB_COLLECTION_SUBITOAPP)
      // ),
    }),
    context: ({ req }) => ({
      // @ts-ignore: TODO Deal with x-app-token type define as "string | string[]", should be "string"
      app: (req.headers['x-app-token'] ? Token.read(req.headers['x-app-token']) : null),
      headers: req.headers,
      gateway: req.headers['x-gateway'],
      services: {
        // Uncomment the next line if you need a service
        // SubitoApp: new SubitoAppService(),
      },
      viewer: (req.headers.authorization ? Token.read(req.headers.authorization) : null),
    }),
    debug: (e.NODE_ENV !== 'production' || e.FORCE_DEBUG),
  });

  server.listen(4001).then(({ url }) => {
    console.log(`SubitoApp server ready at ${url}`)
  });
})();
