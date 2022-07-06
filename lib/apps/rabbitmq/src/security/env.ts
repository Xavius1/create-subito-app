import { Env } from 'subito-lib';

/**
 * List all used vars by the app
 *
 * @public
 */
const env = Env.getAll([
  /**
   * NODE_ENV accepts "development", "test" & "production" values
   * Its default value is "development" if not set on host
   *
   * Default value doesn't apply when APP_ENV = "staging" | "production"
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
   * You can set secret env var with Env.newSecret()
   * It will set defaultValue to "dev"
   * If you need to work with a real secret value, you have to put it into the host env vars
   * NEVER commit a real secret value !
   */
  Env.newSecret('SERVICE_AUTH_KEY'),
  /**
   * With newEnv, you set vars with default value
   * It will be use on all APP_ENV excepts "staging" & "production"
   * (where you need to define it on host)
   */
  Env.newEnv('INTERNAL_GATEWAY', { defaultValue: 'server' }),
  /**
   * With newVar, you set vars with default value
   * This default value will be use everywhere, even when APP_ENV set to "staging" or "production"
   */
  Env.newVar('FORCE_DEBUG', { defaultValue: false, parseType: 'boolean' }),
  /**
   * Config Rabbitmq
   */
  Env.newEnv('RABBITMQ_HOST', { defaultValue: 'rabbitmq' }),
  Env.newEnv('RABBITMQ_LOGIN', { defaultValue: 'guest' }),
  Env.newEnv('RABBITMQ_PASSWORD', { defaultValue: 'guest' }),
  /**
   * Never hard-coded variable into your code
   * Instead, put it here  with newVar() then set a default value
   * That way, other developers don't need to set env vars when they run your code,
   * but anyone can change the value via host env vars, as needed
   * Even more valuable, this can be customized at the deployment step depending on the environment
   */
  Env.newVar('SUBITOAPP_QUEUE_NAME', { defaultValue: 'subito-queue' }),
]);

export default env;
