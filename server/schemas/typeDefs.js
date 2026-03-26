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
        orders: [Order],
        createdAt: String,
        updatedAt: String,
        fullName: String,
        noOfOrders: Float
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
        status: String,
        createdAt: String,
        updatedAt: String

    }
    type Order {
        _id: ID,
        client: User,
        service: Service,
        description: String,
        price: Float,
        status: String,
        adminNotes: String,
        createdAt: String,
        updatedAt: String,
    }

    type Query {
        users: [User]
        services: [Service]
        user(_id: ID!): User
        orders: [Order]
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
        createService(title: String!, description: String!, defaultPrice: Float!, category: String!): Service
        updateService(serviceId: ID!, title: String!, description: String!, defaultPrice: Float!, category: String!, status: String! ): Service
        createOrder(client: ID!, service: ID!, description: String!): Order
        updateUserStatus(clientId: ID!, status: String!): User
    }
`;

module.exports = typeDefs;
