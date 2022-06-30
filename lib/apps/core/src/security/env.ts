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
   * If PWD is not set by the server then it will be initialized by Env
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
  Env.newSecret('SERVICE_AUTH_KEY'),
  /**
   * Never hard-coded variable into your code
   * Instead, put it here then set a default value
   * That way, other developers don't need to set env vars when they run your code,
   * but anyone can change the value via host env vars, as needed
   * Even more valuable, this can be customized at the deployment step depending on the environment
   */
  // ['SAMPLE_VAR', { defaultValue: 'sample_value' }],
]);

export default env;
