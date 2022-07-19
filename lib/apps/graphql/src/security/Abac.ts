import { Abac as Base } from 'subito-graphql';
import SubitoAppAbac from './policies/SubitoAppAbac.js';

/**
 * Abac handles security layer - Define all your policies here
 *
 * @public
 */
class Abac extends Base {
  /**
   * List of all policies to apply
   *
   * @internal
   */
  protected policies = { SubitoAppAbac };
}

export default Abac;
