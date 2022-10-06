/**
 * SubitoApp - Describe its role here
 *
 * @packageDocumentation
 */
import './security/open-telemetry.js';
import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginUsageReportingDisabled } from 'apollo-server-core';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFiles } from 'graphql-import-files';
import { debugMode, Token } from 'subito-lib';
import { Connector as MongoDBConnector } from 'subito-connector-mongodb';
import SubitoApps from './repositories/SubitoApp/SubitoApps.js';
import e from './security/env.js';
import Abac from './security/Abac.js';
import resolvers from './graphql/resolvers/index.js';
// Uncomment the next line if you need a service
// import SubitoAppService from './services/SubitoApp/SubitoAppService';

(async () => {
  const db = await new MongoDBConnector(
    e.MONGODB_MAIN_LINK,
    e.MONGODB_MAIN_NAME,
    {
      authSource: e.MONGODB_MAIN_AUTH,
      replicatSet: e.MONGODB_MAIN_REPLICASET,
    },
  ).connect();

  const server = new ApolloServer({
    schema: buildSubgraphSchema([{
      typeDefs: loadFiles(`${e.PWD}/graphql/schemas/*.gql`),
      resolvers,
    }]),
    plugins: [
      ApolloServerPluginUsageReportingDisabled(),
    ],
    // dataSources will be available into the context from resolvers layer
    dataSources: () => ({
      SubitoApps: new SubitoApps(
        db.collection(e.MONGODB_SUBITOAPP_NAME),
      ),
      // We put Abac into data sources to have access to the context
      Abac: new Abac(),
    }),
    context: ({ req }) => ({
      /**
       * NEVER send clear app data from your endpoint.
       * If someone gains direct access to your micro services, it makes a high security breach.
       * Instead, always read the token at each micro service level.
       *
       * Another security best practice is to create a token that contains the name of the endpoint
       * use to generate it.
       * This way, when you read it, you can verify the endpoint use to execute requests match the
       * one use to created the token.
       * For example, a token created through the internal endpoint should not be used through
       * the client endpoint and vice versa.
       *
       * It's true for all kind of token (app, viewer, etc...)
       */
      app: (req.headers[e.HEADER_APP_TOKEN]
        ? Token.read(
          <string>req.headers[e.HEADER_APP_TOKEN],
          { endpoint: <string>req.headers[e.HEADER_ENDPOINT] },
        )
        : null
      ),
      headers: req.headers,
      /**
       * Your endpoint should identify itself (client, internal, ...)
       * So you can use this data into the ABAC rules and when you read the viewer token (see below)
       */
      endpoint: req.headers[e.HEADER_ENDPOINT],
      /**
       * KEEP IN MIND the token best practices written above
       */
      viewer: (req.headers.authorization
        ? Token.read(
          <string>req.headers.authorization,
          { endpoint: <string>req.headers[e.HEADER_ENDPOINT] },
        )
        : null
      ),
      services: {
        // Uncomment the next line if you need a service
        // SubitoApp: new SubitoAppService(),
      },
    }),
    debug: debugMode(),
  });

  server.listen(4001).then(({ url }) => {
    console.log(`SubitoApp api ready at ${url}`); // eslint-disable-line no-console
  });
})();
