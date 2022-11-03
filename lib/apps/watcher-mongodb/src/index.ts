import './security/open-telemetry.js';
import {
  debugMode, GraphqlClient, Thrower, Subito,
} from 'subito-lib';
import { Connector as MongoDBConnector } from 'subito-connector-mongodb';
import SubitoAppService from './services/SubitoApp/SubitoAppService.js';
import SubitoApps from './repositories/SubitoApp/SubitoApps.js';
import Apis from './repositories/Api/Apis.js';
import options from './security/options.js';
import e from './security/env.js';
import Watcher from './watcher/Watcher.js';

(async () => {
  // Create a GraphQL client
  const client = new GraphqlClient({});

  // Set connections
  const connections = [
    // MongoDB, to set our watcher
    new MongoDBConnector(
      e.MONGODB_MAIN_LINK,
      e.MONGODB_MAIN_NAME,
      {
        authSource: e.MONGODB_MAIN_AUTH,
        // replicatSet: e.MONGODB_MAIN_REPLICASET,
      },
    ).connect(),
    // Connect to the GraphQL endpoint, we'll use it to request api
    client.auth({ service: 'subitotype-subitoapp', secret: e.SERVICE_AUTH_KEY }),
  ];

  const [db, { success }] = await Promise.all(connections);
  if (!success) {
    Thrower.forbidden();
  }

  // We handle the interface layer with a new Subito App
  const app = new Subito({
    dataSources: {
      // Apis handles all requests to the GraphQL endpoint
      Apis: new Apis(client),
      SubitoApps: new SubitoApps(
        db.collection(e.MONGODB_SUBITOAPP_NAME),
      ),
    },
    services: {
      // SubitoApp is the entrypoint of the business layer
      SubitoApp: new SubitoAppService(),
    },
    debug: debugMode(),
  }, options);

  // Run the watcher
  Watcher.run(app);
})();
