/**
 * Repositories handle data layer
 * They can't call other repositories nor services
 * All queries are done inside repositories then called via methods with params
 * Never write queries outside of a repository
 */
import type { IGraphqlClient } from 'subito-lib';
import QUERY_SAMPLE from './queries/QUERY_SAMPLE.js';
import MUTATION_SAMPLE from './queries/MUTATION_SAMPLE.js';

class Api {
  protected client: IGraphqlClient;

  constructor(client: IGraphqlClient) {
    this.client = client;
  }

  async getSample(id: string) {
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
