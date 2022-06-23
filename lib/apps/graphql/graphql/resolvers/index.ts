import { scalars } from 'subito-graphql';
import Mutation from './MutationResolver.js';
import Query from './QueryResolver.js';
import SubitoApp from './SubitoAppResolver.js';
import SubitoAppQuery from './SubitoAppQueryResolver.js';
import SubitoAppMutation from './SubitoAppMutationResolver.js';

const resolvers = {
  ...scalars,

  Mutation,
  Query,

  SubitoApp,
  SubitoAppQuery,
  SubitoAppMutation,
};

export default resolvers;
