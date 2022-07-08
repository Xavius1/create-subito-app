/**
 * Repositories handle data layer
 * They can't call other repositories nor services
 * All queries are done inside repositories then called via methods with params
 * Never write queries outside of a repository
 */
import type { GraphQLClient } from 'subito-lib';
import QUERY_SAMPLE from './queries/QUERY_SAMPLE.js';
import MUTATION_SAMPLE from './queries/MUTATION_SAMPLE.js';

class Api {
  protected client: GraphQLClient;
  
  constructor(client: GraphQLClient) {
    this.client = client;
  }

  async getSample(id) {
    const res = await this.client.execute(
      QUERY_SAMPLE,
      { id },
    );
    return res;
  }

  async setSample() {
    const res = await this.client.execute(
      MUTATION_SAMPLE,
    );
    return res?.ref;
  }
}

export default Api;
