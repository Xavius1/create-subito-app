import { Env } from 'subito-lib';

const env = Env.getAll([
  ['APP_ENV'],
  ['NODE_ENV'],
  ['INTERNAL_GATEWAY', { defaultValue: 'server' }],
  Env.newSecret('JWT_KEY'),
  Env.newSecret('PWD'),
  Env.newSecret('SERVICE_SECRET'),
]);

export default env;
