import {
  DefaultScalarsResolver,
  DefaultCursorResolver,
  DefaultPageInfoResolver,
  DefaultEntityResolver,
} from 'subito-graphql';
import Mutation from './_MutationResolver.js';
import Query from './_QueryResolver.js';
// import SubitoAppSubitoApp from './SubitoAppResolver.js';

// List all entities here
const entities: string[] = [
  'SubitoApp',
];

const resolvers: { [key: string]: any } = {
  ...DefaultScalarsResolver,

  Mutation,
  Query,

  // If you use a custom resolver for your entity, add it here
  // SubitoAppSubitoApp,
};

// Then we auto-add paginator resolvers to each entity & default entity resolver if needed
entities.forEach((entity) => {
  const name = `SubitoApp${entity}`;
  resolvers[`${name}Edge`] = DefaultCursorResolver(name);
  resolvers[`${name}PageInfo`] = DefaultPageInfoResolver(name);

  if (!resolvers[name]) {
    // @ts-ignore TODO Handle this error
    resolvers[name] = { ...DefaultEntityResolver };
  }
});

export default resolvers;
