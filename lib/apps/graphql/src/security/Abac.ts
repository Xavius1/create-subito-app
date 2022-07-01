import { Abac as Base } from 'subito-graphql';
import SubitoAppAbac from './policies/SubitoAppAbac';

/**
 * Abac policies
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
