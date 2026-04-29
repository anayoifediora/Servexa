import { gql } from '@apollo/client';

//Mutation to create a user
export const CREATE_USER = gql`
  mutation Mutation(
    $username: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $phone: String!
    $address: AddressInput!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      phone: $phone
      address: $address
    ) {
      token
      user {
        _id
        address {
          postCode
          state
          street
          suburb
        }
        createdAt
        firstName
        email
        fullName
        lastName
        phone
        role
        status
        username
        updatedAt
      }
    }
  }
`;

//Mutation to enable a user login
export const LOGIN = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        firstName
        fullName
        email
        lastName
        _id
        role
      }
    }
  }
`;
