import { Env } from 'subito-lib';

const env = Env.getAll([
  ['APP_ENV', { allow: ['local', 'current', 'develop', 'integration', 'staging', 'production'] }],
  ['NODE_ENV', { allow: ['development', 'test', 'production'] }],
  ['INTERNAL_GATEWAY', { defaultValue: 'server' }],
  Env.newSecret('JWT_KEY'),
  Env.newSecret('PWD'),
  Env.newSecret('SERVICE_SECRET'),
]);

export default env;
