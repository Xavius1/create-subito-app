import { DefaultMutationResolver } from 'subito-graphql';

const MutationResolver = {
  subitoapp() {
    return {
      SubitoApp: DefaultMutationResolver('SubitoApps'),
    };
  },
};

export default MutationResolver;
