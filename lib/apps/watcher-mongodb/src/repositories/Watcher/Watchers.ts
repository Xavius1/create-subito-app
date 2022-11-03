/**
 * Repositories handle the data layer
 * They can't call other repositories nor services
 * All queries are done inside repositories then called via methods with params
 * !! NEVER write queries outside of a repository
 */
import { Repository } from 'subito-connector-mongodb';
// Uncomment the next line if you use env vars
// import e from '../../security/env';

class Watchers extends Repository {
  private watcherName: string;

  constructor(collection, watcherName) {
    super(collection);
    this.watcherName = watcherName;
  }

  async getLastStream() {
    return this.collection.findOne({ ref: this.watcherName });
  }

  async setCurrentStream(id) {
    return this.collection.updateOne(
      { ref: this.watcherName },
      {
        $set: {
          date: new Date(),
          streamId: id,
        },
      }
    )
  }
}

export default Watchers;
