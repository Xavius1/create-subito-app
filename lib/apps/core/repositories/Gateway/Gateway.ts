import QUERY_SAMPLE from './queries/QUERY_SAMPLE.js';
import MUTATION_SAMPLE from './queries/MUTATION_SAMPLE.js';

class Gateway {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async getSample(id) {
    const res = await this.gateway.execute(
      QUERY_SAMPLE,
      { id },
    );
    return res;
  }

  async setSample() {
    const res = await this.gateway.execute(
      MUTATION_SAMPLE,
    );
    return res?.ref;
  }
}

export default Gateway;
