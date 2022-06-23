import SubitoAppMutation from './SubitoAppMutationResolver.js';

const MutationResolver = {
  subitoapp() {
    return SubitoAppMutation;
  },
};

export default MutationResolver;
