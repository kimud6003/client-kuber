import { gql } from "apollo-boost";

export const LOG_USER_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;

export const USER_PROFILE = gql`
  query userProfile {
    GetMyProfile {
      ok
      error
      user {
        id
        profilePhoto
        firstName
        lastName
        fullName
        isDriving
      }
    }
  }
`;

export const GET_PLACES = gql`
  query getPlaces {
    GetMyPlaces {
      ok
      error
      places {
        id
        name
        address
        isFav
      }
    }
  }
`;
