/**
 * Created by david on 7/11/17.
 */
import gql from 'graphql-tag';

export default gql`
  mutation SignUp($email: String, $password: String){
    signup(email: $email, password: $password){
      id
      email
    }
  }
`;
