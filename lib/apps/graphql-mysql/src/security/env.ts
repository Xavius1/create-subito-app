import { Env } from 'subito-lib';

/**
 * List all used vars by the app
 *
 * @public
 */
const env = Env.getAll([
  /**
   * You can set secret env var with Env.newSecret()
   * It will set defaultValue to "dev", you can't change this.
   * If you need to work with a real secret value, you have to put it into the host env vars
   * !! KEEP IN MIND: NEVER commit a real secret value !
   */
  Env.newSecret('MYSQL_MAIN_PASSWORD'),
  /**
   * With newEnv, you set vars with default value
   * It will be use on all APP_ENV excepts "staging" & "production"
   * (where you need to define it on host)
   */
  Env.newEnv('MYSQL_MAIN_HOST', { defaultValue: 'mysql' }), // db name
  Env.newEnv('MYSQL_MAIN_USER', { defaultValue: 'admin' }), // db auth name
  Env.newEnv('MYSQL_MAIN_DBNAME', { defaultValue: 'app' }), // replica set name
  /**
   * With newVar, you set vars with default value
   * This default value will be use everywhere, even when APP_ENV is set to "staging"
   * or "production"
   */

  // Uncomment the next line if you want to use one secret auth key per service
  // Env.newSecret('SUBITOTYPE_SUBITOAPP_AUTH_KEY'),

  /**
   * !! NEVER hard-coded variable into your code
   * Instead, put it here with newSecret(), newEnv() or newVar() then set a default value
   * You can also use aliases of newVar(): newBool(), newInt(), newFloat() & newArray()
   * That way, other developers don't need to set env vars when they run your code,
   * but anyone can change the value via host env vars, as needed
   * Even more valuable, this can be customized at the deployment step depending on the environment
   */
]);

export default env;
