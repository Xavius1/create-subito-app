/**
 * Repositories handle the data layer
 * They can't call other repositories nor services
 * All queries are done inside repositories then called via methods with params
 * !! NEVER write queries outside of a repository
 */
import { Repository } from 'subito-connector-mongodb';
// Uncomment the next line if you use env vars
// import e from '../../security/env';

class SubitoApps extends Repository {
  // constructor(collection) {
  //   super(collection);
  //   Define your custom default cursor here (if not, it will use the field createdAt)
  //   this.cursor = {
  //     field: e.MONGODB_SUBITOAPP_CURSOR,
  //     type: e.MONGODB_SUBITOAPP_CSTYPE,
  //   };
  // }
}

export default SubitoApps;
