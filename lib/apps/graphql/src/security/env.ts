import { Env } from 'subito-lib';

const env = Env.getAll([
  /**
   * NODE_ENV accepts "development", "test" & "production" values
   * Its default value is "development" if not set on host
   *
   * Default value doesn't apply when APP_ENV = "staging" | "production",
   * as for all defaults set with Env class
   */
  ['NODE_ENV'],
  /**
   * APP_ENV accepts "local", "current", "develop", "integration", "staging" & "production" values
   * Its default value is "local"
   */
  ['APP_ENV'],
  /**
   * If PWD is not set by NodeJS then it will be initialized by Env
   */
  ['PWD'],
  /**
   * You can set defaultValue for an env var that is not defined
   * It will be use on all APP_ENV excepts "staging" & "production"
   */
  ['INTERNAL_GATEWAY', { defaultValue: 'server' }],
  ['FORCE_DEBUG', { defaultValue: 'false' }],
  /**
   * You can set secret env var with Env.newSecret()
   * It will set defaultValue to "dev"
   * If you need to work with a real secret value, you have to put it into the host env vars
   * NEVER commit a real secret value !
   */
  Env.newSecret('JWT_KEY'),
  Env.newSecret('SERVICE_AUTH_KEY'),
  /**
   * Never hard-coded variable into your code
   * Instead, put it here then set a default value
   * That way, other developers don't need to set env vars when they run your code,
   * but anyone can change the value via host env vars, as needed
   * Even more valuable, this can be customized at the deployment step depending on the environment
   */
  // Uncomment the next 7 lines if you use MongoDB connection
  // ['MONGODB_MAIN_LINK', { defaultValue: 'mongodb://mongodb:27017/' }], // mongodb host(s)
  // ['MONGODB_MAIN_NAME', { defaultValue: 'app' }], // db name
  // ['MONGODB_MAIN_AUTH', { defaultValue: 'app' }], // db auth name
  // ['MONGODB_MAIN_REPLICASET', { defaultValue: 'rs0' }], // replica set name
  // ['MONGODB_SUBITOAPP_NAME', { defaultValue: 'subitoapp' }], // subitoapp collection name
  // ['MONGODB_SUBITOAPP_CURSOR', { defaultValue: 'createdAt' }], // subitoapp default cursor name
  // ['MONGODB_SUBITOAPP_CSTYPE', { defaultValue: 'Date' }], // subitoapp default cursor type
]);

export default env;
