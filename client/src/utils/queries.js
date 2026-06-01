import { gql } from '@apollo/client';

//Query to fetch recent orders
export const QUERY_RECENT_ORDERS = gql`
  query Query {
    recentOrders {
      _id
      adminNotes
      client {
        fullName
        email
        address {
          postCode
          state
          street
          suburb
        }
        phone
      }
      createdAt
      description
      price
      status
      updatedAt
      service {
        description
        status
        title
        updatedAt
        defaultPrice
        _id
        createdAt
        category
      }
    }
  }
`;
//Query to fetch all orders
export const QUERY_ORDERS = gql`
  query Query {
    orders {
      _id
      adminNotes
      client {
        fullName
        email
        address {
          postCode
          state
          street
          suburb
        }
        phone
      }
      createdAt
      description
      price
      status
      updatedAt
      service {
        description
        status
        title
        updatedAt
        defaultPrice
        _id
        createdAt
        category
      }
    }
  }
`;

//Query to get a single order
export const QUERY_SINGLE_ORDER = gql`
  query Query($orderId: ID!) {
    order(orderId: $orderId) {
      _id
      adminNotes
      client {
        address {
          postCode
          state
          street
          suburb
        }
        createdAt
        email
        fullName
        noOfOrders
        phone
        status
        updatedAt
      }
      createdAt
      description
      price
      status
      updatedAt
      service {
        title
        description
        category
      }
    }
  }
`;
//Query to get all users

export const QUERY_ALL_USERS = gql`
  query Query {
    users {
      _id
      firstName
      lastName
      email
      createdAt
      noOfOrders
      phone
      status
      updatedAt
    }
  }
`;
// Query to get a single user
export const QUERY_SINGLE_USER = gql`
  query Query($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      fullName
      email
      phone
      status
      role
      address {
        postCode
        state
        street
        suburb
      }
      createdAt
      updatedAt
    }
  }
`;
//Query to obtain all services
export const QUERY_SERVICES = gql`
  query Query {
    services {
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
//Query to get a single service
export const QUERY_SINGLE_SERVICE = gql`
  query Query($serviceId: ID!) {
    service(serviceId: $serviceId) {
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
