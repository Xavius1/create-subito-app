import { DefaultQueryResolver } from 'subito-graphql';

const QueryResolver = {
  subitoapp() {
    return {
      SubitoApp: DefaultQueryResolver('SubitoApp'),
    };
  },
};

export default QueryResolver;
