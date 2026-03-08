const { ApolloServer } = require('@apollo/server');

const typeDefs = `
    input AddressInput {
        street: String!
        suburb: String!
        state: String!
        postCode: String!
    }
    type Address {
        street: String!
        suburb: String!
        state: String!
        postCode: String!
    }
    type User {
        _id: ID
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        role: String,
        status: String,
        phone: String,
        address: Address,
        
    }

    type Query {
        users: [User]
    }
`

module.exports = typeDefs;