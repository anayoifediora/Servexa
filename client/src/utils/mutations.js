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
//Mutation to update a user status
export const UPDATE_USER_STATUS = gql`
  mutation Mutation($clientId: ID!, $status: String!) {
    updateUserStatus(clientId: $clientId, status: $status) {
      _id
      firstName
      lastName
      createdAt
      email
      phone
      role
      status
      updatedAt
    }
  }
`;
//Mutation to update an order status
export const UPDATE_ORDER_STATUS = gql`
  mutation Mutation($orderId: ID!, $status: String!, $price: Float!, $adminNotes: String!) {
    updateOrderStatus(orderId: $orderId, status: $status, price: $price, adminNotes: $adminNotes) {
      _id
      adminNotes
      description
      price
      status
      updatedAt
      createdAt
    }
  }
`;
//Mutation to update a service
export const UPDATE_SERVICE = gql`
  mutation Mutation(
    $serviceId: ID!
    $title: String!
    $description: String!
    $defaultPrice: Float!
    $category: String!
    $status: String!
  ) {
    updateService(
      serviceId: $serviceId
      title: $title
      description: $description
      defaultPrice: $defaultPrice
      category: $category
      status: $status
    ) {
      _id
      category
      createdAt
      defaultPrice
      description
      status
      title
      updatedAt
    }
  }
`;
//Mutation to create a service
export const CREATE_SERVICE = gql`
  mutation Mutation(
    $title: String!
    $description: String!
    $defaultPrice: Float!
    $category: String!
  ) {
    createService(
      title: $title
      description: $description
      defaultPrice: $defaultPrice
      category: $category
    ) {
      _id
      category
      createdAt
      defaultPrice
      description
      status
      title
      updatedAt
    }
  }
`;
//Mutation that allows the user update password
export const UPDATE_PASSWORD = gql`
  mutation Mutation($email: String!, $oldPassword: String!, $newPassword: String!) {
    updatePassword(email: $email, oldPassword: $oldPassword, newPassword: $newPassword) {
      _id
      firstName
      email
      fullName
      lastName
    }
  }
`;
