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
