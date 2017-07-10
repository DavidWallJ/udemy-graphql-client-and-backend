/**
 * Created by david on 7/10/17.
 */
import gql from 'graphql-tag';

export default gql`
  mutation {
    logout {
      id
      email
    }
  }
`;