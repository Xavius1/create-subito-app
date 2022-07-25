import './security/open-telemetry.js';
import { debugMode, GraphqlClient, Thrower, Subito } from 'subito-lib';
import { Connector, Repository } from 'subito-connector-rabbitmq';
import SubitoAppService from './services/SubitoApp/SubitoAppService.js';
import Apis from './repositories/Api/Apis.js';
import options from './security/options.js';
import e from './security/env.js';

(async () => {
  // Connect to the GraphQL endpoint, we'll use it to request api
  const client = new GraphqlClient({});
  const { success } = await client.auth({ service: 'subitotype-subitoapp', secret: e.SERVICE_AUTH_KEY });
  if (!success) {
    Thrower.forbidden();
  }

  // Connect to the RabbitMQ endpoint needed by the consumer
  const rmq = new Connector({
    hostname: e.RABBITMQ_HOST,
    username: e.RABBITMQ_LOGIN,
    password: e.RABBITMQ_PASSWORD,
  });
  await rmq.connect();

  // We handle the interface layer with a new Subito App
  const app = new Subito({
    dataSources: {
      // Apis handles all requests to the GraphQL endpoint
      Apis: new Apis(client),
      // SubitoApps publishes & consumes to & from a RabbitMQ queue
      SubitoApps: new Repository(await rmq.channel(e.BOT_QUEUE_NAME)),
    },
    services: {
      // SubitoApp is the entrypoint of the business layer
      SubitoApp: new SubitoAppService(),
    },
    debug: debugMode(),
  }, options);

  // Start to consume the queue
  const {
    dataSources: { SubitoApps },
    services: { SubitoApp },
  } = app.context;
  SubitoApps.consume(SubitoApp.run);
})();
