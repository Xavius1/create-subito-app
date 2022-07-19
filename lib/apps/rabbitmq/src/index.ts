import './security/open-telemetry';
import { debugMode, GraphqlClient, Thrower } from 'subito-lib';
import SubitoAppService from './services/SubitoApp/SubitoAppService.js';
import Api from './repositories/Api/Api.js';
import Consumer from './consumer/Consumer.js';
import e from './security/env.js';

(async () => {
  // Connect to the GraphQL endpoint, we'll use it to request api
  const client = new GraphqlClient({});
  const { success } = await client.auth({ service: 'subitotype-subitoapp', secret: e.SERVICE_AUTH_KEY });
  if (!success) {
    Thrower.forbidden();
  }

  // Create consumer
  const consumer = new Consumer({
    endpoint: e.INTERNAL_GRAPHQL_ENDPOINT,
    dataSources: {
      Api: new Api(client),
    },
    services: {
      SubitoApp: new SubitoAppService(),
    },
    debug: debugMode(),
  });

  // Connect it to rabbitmq, you have to pass the queue name as param
  await consumer.connect(e.SUBITOAPP_QUEUE_NAME);

  // Then consume
  consumer.consume();
})();
