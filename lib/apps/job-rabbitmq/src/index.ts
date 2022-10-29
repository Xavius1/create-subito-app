import './security/open-telemetry.js';
import cron from 'node-cron';
import { Connector, Repository } from 'subito-connector-rabbitmq';
import {
  debugMode, GraphqlClient, Thrower, Subito,
} from 'subito-lib';
import SubitoAppService from './services/SubitoApp/SubitoAppService.js';
import Apis from './repositories/Api/Apis.js';
import options from './security/options.js';
import e from './security/env.js';

const run = async () => {
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
    },
    services: {
      // SubitoApp is the entrypoint of the business layer
      SubitoApp: new SubitoAppService(),
      // SubitoApps publishes & consumes to & from a RabbitMQ queue
      SubitoApps: new Repository(await rmq.channel(e.SUBITOAPP_QUEUE_NAME)),
    },
    debug: debugMode(),
  }, options);

  // Run the service
  const {
    services: { SubitoApp },
  } = app.context;
  SubitoApp.run(SubitoApp);
};

const args = process.argv.slice(2);
const [min, hour, dom, month, dow] = args;
if (min === '--now') {
  run();
} else {
  cron.schedule(`${min} ${hour} ${dom} ${month} ${dow}`, () => run());
}
