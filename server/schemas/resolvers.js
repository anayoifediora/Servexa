const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');
const { User, Service, Order } = require('../models');
const { formatDate, checkAuthorization } = require('../helpers');
const bcrypt = require('bcrypt');

const timestampFields = {
  createdAt: (document) => formatDate(document.createdAt),
  updatedAt: (document) => formatDate(document.updatedAt),
};

const resolvers = {
  //Query section
  Query: {
    //List all users
    users: async (parent, args, context) => {
      checkAuthorization(context, ["admin"])
      return User.find().populate("orders").populate({
        path: "orders",
        populate: ["service", "client"]
      });
    },
    //List all Services
    services: async () => {
      return await Service.find();
    },
    user: async (parent, { _id }, context) => {
      checkAuthorization(context, ["admin"])
      const user = await User.findOne({ _id }).populate("orders").populate({
        path: "orders",
        populate: ["service", "client"]
      });
      return user;
    },
    orders: async (parent, args, context) => {
        return Order.find().populate(["client", "service"])
    }
  },

  //Mutations section
  Mutation: {
    //Creates a new user
    createUser: async (parent, args) => {
      try {
        const { username, firstName, lastName, email, password, phone, address } = args;
        const user = await User.create({
          username,
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
        });

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        if (error.code === 11000) {
          throw new GraphQLError('User already exists', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
        throw new GraphQLError(error.message);
      }
    },
    //Logs in a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        throw new GraphQLError('Incorrect Email or Password!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      //Confirm password is correct
      const correctPassword = await user.isCorrectPassword(password);
      if (!correctPassword) {
        throw new GraphQLError('Incorrect Email or Password!', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }
      const token = signToken(user);
      return { token, user };
    },
    //Updating a user's status
    updateUserStatus: async (parent, { clientId, status}, context) => {
        checkAuthorization(context, ["admin"])
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: clientId },
                { status },
                { returnDocument: 'after', runValidators: true }

            )
            return updatedUser;
        } catch (err) {
            throw new GraphQLError(err.message, {
                extensions: { code: "BAD_USER_INPUT" }
            })
        }
    },
    //Update user password
    updatePassword: async (parent, { oldPassword, newPassword, email }) => {
        checkAuthorization(context, ["admin", "client"])
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError('User not found');
      }
      //Verify old password is correct
      const isCorrectOldPassword = await bcrypt.compare(oldPassword, user.password);

      if (!isCorrectOldPassword) {
        throw new Error('Old password is incorrect!');
      }
      //Ensure new password is not same as old one
      const isPasswordSame = await bcrypt.compare(newPassword, user.password);
      if (isPasswordSame) {
        throw new Error('Please use a different password!');
      }
      user.password = newPassword;
      await user.save();
      return user;
    },
    //Creating a service
    createService: async (parent, args, context) => {
      checkAuthorization(context, ["admin"])
      try {
        const { title, description, defaultPrice, category } = args;
        if (!title || !description || !defaultPrice || !category) {
          throw new GraphQLError('Please complete all fields', {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          });
        }
        const service = await Service.create({
          title,
          description,
          defaultPrice,
          category,
        });
        return service;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },
    //Update a service
    updateService: async (parent, args, context) => {
        checkAuthorization(context, ["admin"])
      try {
        const { serviceId, title, description, defaultPrice, category, status } = args;
        const updatedService = await Service.findOneAndUpdate(
          { _id: serviceId },
          { title, description, defaultPrice, category, status },
          { returnDocument: 'after', runValidators: true }
        );
        return updatedService;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    //Mutation to create an order
    createOrder: async (parent, args, context) => {
      checkAuthorization(context, ["client"])
      try {
        const { client, service, description } = args;
        const requestedService = await Service.findById({ _id: service });
        if (!requestedService) {
          throw new GraphQLError('No service with this id', {
            extensions: { code: 'BAD_USER_INPUT' },
          });
        }
        if (requestedService.status !== 'Active') {
          throw new GraphQLError('Service no longer offered');
        }
        
          const order = await Order.create({
            client,
            service,
            description,
          });

          await User.findOneAndUpdate(
            { _id: client },
            { $addToSet: { orders: order._id } },
            { returnDocument: 'after' }
          );
          return order;
        
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    //Mutation to update the status of an order
    updateOrderStatus: async (parent, args, context) => {
        checkAuthorization(context, ["admin"]);
        try {
            const { orderId, status, price, adminNotes } = args;
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: orderId },
                { status, price, adminNotes },
                { returnDocument: 'after', runValidators: true }
            )
            if (!updatedOrder) {
                throw new GraphQLError(`Order with ID ${orderId} not found`, {
                    extensions: { code: 'NOT_FOUND' }
                })
            }
            if (updatedOrder.status === 'Closed') {
              throw new GraphQLError("This order has been closed and cannot be updated!", {
                extensions: { code: 'BAD_REQUEST' }
              })
            }
            return updatedOrder;
        } catch (error) {
            throw new GraphQLError(error.message, {
                extensions: {
                    code: error.name === 'CastError' ? 'BAD_USER_INPUT' : 'INTERNAL_SERVER_ERROR',
                    argumentName: 'orderId'
                }
            })
        }
    }
  },
  //Field resolver to format date
  User: timestampFields,
  Service: timestampFields,
  Order: timestampFields,
  //Field resolver to obtain number of orders per user
  User: {
    noOfOrders: (document) => document.orders.length
  }
};

module.exports = resolvers;
