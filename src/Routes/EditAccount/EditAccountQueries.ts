import { gql } from "apollo-boost";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String!
    $lastName: String!
    $profilePhoto: String!
  ) {
    UpdateMyProfile(
      firstName: $firstName
      lastName: $lastName
      profilePhoto: $profilePhoto
    ) {
      ok
      error
    }
  }
`;
