import './security/open-telemetry';
import { Gateway as GatewayLib, Thrower } from 'subito-lib';
import SubitoAppService from './services/SubitoApp/SubitoAppService';
import Gateway from './repositories/gateway/Gateway';
import Consumer from './consumer/Consumer';
import e from './security/env';

(async () => {
  // Init gateway, we'll use it to request api
  const gateway = new GatewayLib({});
  const { success, auth } = await gateway.auth({ service: 'subitoapp', secret: e.SERVICE_AUTH_KEY });
  if (!success) {
    Thrower.forbidden();
  }

  // Create consumer
  const consumer = new Consumer({
    gateway: e.INTERNAL_GATEWAY,
    dataSources: {
      Gateway: new Gateway(gateway),
    },
    services: {
      SubitoApp: new SubitoAppService(),
    },
    debug: (e.NODE_ENV !== 'production'),
  });

  // Connect it to rabbitmq, you have to pass the queue name as param
  await consumer.connect(e.SUBITOAPP_QUEUE_NAME);

  // Then consume
  consumer.consume();
})();
