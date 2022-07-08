import './security/open-telemetry';
import { debugMode, GraphqlClient, Thrower } from 'subito-lib';
import SubitoAppService from './services/SubitoApp/SubitoAppService';
import Api from './repositories/Api/Api';
import Consumer from './consumer/Consumer';
import e from './security/env';

(async () => {
  // Init gateway, we'll use it to request api
  const client = new GraphqlClient();
  const { success, auth } = await client.auth({ service: 'subitoapp', secret: e.SERVICE_AUTH_KEY });
  if (!success) {
    Thrower.forbidden();
  }

  // Create consumer
  const consumer = new Consumer({
    gateway: e.INTERNAL_GATEWAY,
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
