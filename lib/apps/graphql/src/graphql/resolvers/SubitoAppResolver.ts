/**
 * Resolvers handle the presentation layer
 * They can call services like repositories
 * Here we map entities fields with the graphql schema
 * Also here that we care to match the GraphQL/RelayJS conventions
 *
 * Resolvers call the security layer to handle ABAC before performing operations or
 * returning data
 * NEVER FORGET to call the security layer, if not your API will be at VERY HIGH risks !
 */
// If you need a custom resolver for your entity, 
// don't forget to add it in your customs resolvers into index.ts file
import { DefaultEntityResolver } from 'subito-graphql';

const SubitoAppResolver = {
  ...DefaultEntityResolver,
};

export default SubitoAppResolver;
