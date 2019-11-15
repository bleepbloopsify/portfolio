import { gql } from 'apollo-boost';


export const REGISTER_ACCOUNT = gql`
mutation {
  registerAccount
}
`;

export const LOGIN_ACCOUNT = gql`
mutation login($email: String!, $password: String!) {
  login(account:{
    email: $email
    password: $password
  })
}
`;

