import { GID } from 'subito-graphql';

const BasicIdResolver = {
  id(obj, args, context, { parentType }) {
    return GID.encode(
      parentType,
      obj.get('id'),
    );
  },
};

export default BasicIdResolver;
