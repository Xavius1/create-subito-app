import { gql } from 'graphql-request';

const QUERY_SAMPLE = gql`
  query getSample($id: String!) {
    getSample(id: $id) {
      id
    }
  }
`;

export default QUERY_SAMPLE;
