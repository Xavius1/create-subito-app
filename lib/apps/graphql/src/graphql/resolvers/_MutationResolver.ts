import { DefaultMutationResolver } from 'subito-graphql';

const MutationResolver = {
  subitoapp() {
    return {
      SubitoApp: DefaultMutationResolver('SubitoApp'),
    };
  },
};

export default MutationResolver;
