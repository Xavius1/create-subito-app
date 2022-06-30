/**
 * Repositories handle the data layer
 * They can't call other repositories nor services
 * All queries are done inside repositories then called via methods with params
 * Never write queries outside of a repository
 */
// Uncomment the next lines if you need to write a repository
// import MongoDBRepository from 'subito-connector-mongodb';
// import e from '../../security/env';

// class SubitoApps extends MongoDBRepository {
//   constructor(collection) {
//     super(collection);
//     // Define your default cursor here
//     this.cursor = {
//       field: e.MONGODB_SUBITOAPP_CURSOR_NAME,
//       type: e.MONGODB_SUBITOAPP_CURSOR_TYPE };
//   }
// }

// export default SubitoApps;
