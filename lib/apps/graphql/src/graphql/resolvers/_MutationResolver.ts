import { DefaultMutationResolver } from 'subito-graphql';

/**
 * Namespace mutation resolver
 *
 * @public
 */
const MutationResolver = {
  /**
   * Get the namespace mutation resolvers
   *
   * @returns
   *
   * @public
   */
  subitoapp() {
    return {
      SubitoApp: DefaultMutationResolver('SubitoApp'),
    };
  },
};

export default MutationResolver;
