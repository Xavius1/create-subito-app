import { gql } from 'graphql-request';

const MUTATION_SAMPLE = gql`
  mutation setSample($id: String!) {
    setSample(input: { id: $id }) {
      status
    }
  }
`;

export default MUTATION_SAMPLE;
