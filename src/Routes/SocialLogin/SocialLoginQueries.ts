import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstName: String!
    $lastName: String!
    $fbId: String!
  ) {
    FacebookConnect(
      firstName: $firstName
      lastName: $lastName
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;
