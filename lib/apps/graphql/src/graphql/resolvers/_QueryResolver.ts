import { DefaultQueryResolver } from 'subito-graphql';

const QueryResolver = {
  subitoapp() {
    return {
      SubitoApp: DefaultQueryResolver('SubitoApps'),
    };
  },
};

export default QueryResolver;
