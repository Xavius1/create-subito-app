import { DefaultQueryResolver } from 'subito-graphql';

/**
 * Query namespace resolvers
 *
 * @public
 */
const QueryResolver = {
  /**
   * Get the query namespace resolvers
   *
   * @returns
   *
   * @public
   */
  subitoapp() {
    return {
      SubitoApp: DefaultQueryResolver('SubitoApp'),
    };
  },
};

export default QueryResolver;
