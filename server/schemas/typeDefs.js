const { ApolloServer } = require('@apollo/server');

const typeDefs = `
    directive @rateLimit (
        max: Int,
        window: String
    ) on FIELD_DEFINITION
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
        orders: [Order]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Service {
        _id: ID,
        title: String,
        description: String,
        defaultPrice: Float,
        category: String,
        status: String

    }
    type Order {
        _id: ID,
        client: User,
        service: Service,
        description: String,
        price: Float,
        status: String,
        adminNotes: String
    }

    type Query {
        users: [User]
        services: [Service]
    }
    
    type Mutation {
        createUser(
            username: String!,
            firstName: String!,
            lastName: String!,
            email: String!,
            password: String!,
            phone: String!,
            address: AddressInput!
        ) : Auth
        
        login(email: String!, password: String!): Auth
            @rateLimit(max: 5, window: "10m")
        
        updatePassword(email: String!, oldPassword: String!, newPassword: String!): User
    }
`;

module.exports = typeDefs;
