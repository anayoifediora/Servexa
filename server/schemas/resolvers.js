const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');
const { User, Service, Order } = require('../models');
const { formatDate, checkAuthorization, calculatePercentageChange } = require('../helpers');
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
      checkAuthorization(context, ['admin']);
      const users = await User.find({ role: { $ne: 'admin' } })
        .populate('orders')
        .populate({
          path: 'orders',
          populate: ['service', 'client'],
        });
      return users;
    },
    //List all Services
    services: async (parent, args, context) => {
      checkAuthorization(context, ['admin', 'client']);
      return await Service.find();
    },
    //Find a single user by Id, including associated orders
    user: async (parent, { _id }, context) => {
      checkAuthorization(context, ['admin', 'client']);
      const user = await User.findOne({ _id })
        .populate('orders')
        .populate({
          path: 'orders',
          populate: ['service', 'client'],
        });
      return user;
    },
    //List all orders
    orders: async (parent, args, context) => {
      checkAuthorization(context, ['admin']);
      return Order.find().sort({ createdAt: -1 }).populate(['client', 'service']);
    },
    //List recent orders
    recentOrders: async (parent, args, context) => {
      checkAuthorization(context, ['admin']);
      return Order.find({
        createdAt: { $gte: new Date('2026-03-25'), $lt: new Date() },
      })
        .sort({ createdAt: -1 })
        .populate(['client', 'service']);
    },
    //GET a single order with orderId
    order: async (parent, { orderId }, context) => {
      checkAuthorization(context, ['client', 'admin']);
      const order = await Order.findOne({ _id: orderId }).populate(['client', 'service']);
      return order;
    },
    //GET a single service with serviceId
    service: async (parent, { serviceId }, context) => {
      checkAuthorization(context, ['admin']);
      const service = await Service.findOne({ _id: serviceId });
      return service;
    },
    //GET orders by searching with a keyword which will be orderId
    orderResults: async (parent, { keyWord }) => {
      if (!keyWord) {
        throw new GraphQLError('Please insert search keyword', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // 1. find matching users
      const users = await User.find({
        lastName: { $regex: keyWord, $options: 'i' },
      });

      const userIds = users.map((user) => user._id);

      // 2. find matching services
      const services = await Service.find({
        title: { $regex: keyWord, $options: 'i' },
      });

      const serviceIds = services.map((service) => service._id);

      // 3. final order search (combined)
      return Order.find({
        $or: [
          { client: { $in: userIds } },
          { service: { $in: serviceIds } },
          { status: { $regex: keyWord, $options: 'i' } },
          { _id: keyWord.length === 24 ? keyWord : null }, // optional fallback
        ],
      })
        .populate('client')
        .populate('service');
    },
    dashboardIndices: async (parent, args, context) => {
      checkAuthorization(context, ['admin']);

      const now = new Date();

      // First day of current month
      const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      // First and last day of previous month
      const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

      const [
        activeUsersCurrent,
        activeUsersPrevious,
        pendingOrdersCurrent,
        pendingOrdersPrevious,
        totalOrdersCurrent,
        totalOrdersPrevious,
        revenueCurrent,
        revenuePrevious,
      ] = await Promise.all([
        //Current approved users
        User.countDocuments({
          role: { $ne: 'admin' },
          status: 'Approved',
        }),
        //Approved users as at previous month
        User.countDocuments({
          role: { $ne: 'admin' },
          status: 'Approved',
          createdAt: {
            $lte: previousMonthEnd,
          },
        }),
        //Pending Orders - Current month
        Order.countDocuments({
          status: 'Pending Review',
          createdAt: { $gte: currentMonthStart },
        }),
        //Pending Orders - previous month
        Order.countDocuments({
          status: 'Pending Review',
          createdAt: {
            $gte: previousMonthStart,
            $lte: previousMonthEnd,
          },
        }),
        //Total Orders - current month
        Order.countDocuments({
          createdAt: { $gte: currentMonthStart },
        }),
        //Total Orders - previous month
        Order.countDocuments({
          createdAt: {
            $gte: previousMonthStart,
            $lte: previousMonthEnd,
          },
        }),
        //Revenue - Current month
        Order.aggregate([
          {
            $match: {
              status: 'In Progress',
              createdAt: { $gte: currentMonthStart },
              price: { $ne: null },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$price' },
            },
          },
        ]),
        //Revenue - Previous month
        Order.aggregate([
          {
            $match: {
              status: 'In Progress',
              createdAt: {
                $gte: previousMonthStart,
                $lte: previousMonthEnd,
              },
              price: { $ne: null },
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$price' },
            },
          },
        ]),
      ]);

      const currentRevenue = revenueCurrent.length > 0 ? revenueCurrent[0].total : 0;

      const previousRevenue = revenuePrevious.length > 0 ? revenuePrevious[0].total : 0;

      return {
        //Current values shown on dashboard data
        activeUsers: activeUsersCurrent,
        totalRevenue: currentRevenue,
        pendingOrders: pendingOrdersCurrent,
        totalOrders: totalOrdersCurrent,
        //Percentage changes
        activeUsersChange: calculatePercentageChange(activeUsersCurrent, activeUsersPrevious),

        revenueChange: calculatePercentageChange(currentRevenue, previousRevenue),

        pendingOrdersChange: calculatePercentageChange(pendingOrdersCurrent, pendingOrdersPrevious),

        totalOrdersChange: calculatePercentageChange(totalOrdersCurrent, totalOrdersPrevious),
      };
    },
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
          const field = Object.keys(error.keyPattern)[0];
          throw new GraphQLError(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is already in use. Please choose another.`,
            {
              extensions: { code: 'BAD_USER_INPUT' },
            }
          );
        }
        console.log(error);
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
    updateUserStatus: async (parent, { clientId, status }, context) => {
      checkAuthorization(context, ['admin']);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: clientId },
          { status },
          { returnDocument: 'after', runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        throw new GraphQLError(err.message, {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }
    },
    //Update user password
    updatePassword: async (parent, { oldPassword, newPassword, email }, context) => {
      checkAuthorization(context, ['admin', 'client']);
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError('User not found');
      }
      //Verify old password is correct
      const isCorrectOldPassword = await bcrypt.compare(oldPassword, user.password);

      if (!isCorrectOldPassword) {
        throw new GraphQLError('Old password is incorrect!');
      }
      //Ensure new password is not same as old one
      const isPasswordSame = await bcrypt.compare(newPassword, user.password);
      if (isPasswordSame) {
        throw new GraphQLError('Please use a different password!');
      }
      user.password = newPassword;
      await user.save();
      return user;
    },
    //Creating a service
    createService: async (parent, args, context) => {
      checkAuthorization(context, ['admin']);
      try {
        const { title, description, defaultPrice, category } = args;
        if (!title && !description && !defaultPrice && !category) {
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
      checkAuthorization(context, ['admin']);
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
      checkAuthorization(context, ['client']);
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
      checkAuthorization(context, ['admin']);
      try {
        const { orderId, status, price, adminNotes } = args;
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { status, price, adminNotes },
          { returnDocument: 'after', runValidators: true }
        );
        if (!updatedOrder) {
          throw new GraphQLError(`Order with ID ${orderId} not found`, {
            extensions: { code: 'NOT_FOUND' },
          });
        }
        if (updatedOrder.status === 'Closed') {
          throw new GraphQLError('This order has been closed and cannot be updated!', {
            extensions: { code: 'BAD_REQUEST' },
          });
        }
        return updatedOrder;
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: error.name === 'CastError' ? 'BAD_USER_INPUT' : 'INTERNAL_SERVER_ERROR',
            argumentName: 'orderId',
          },
        });
      }
    },
    //Mutation to update a user's details
    updateUser: async (parent, args, context) => {
      checkAuthorization(context, ['client', 'admin']);
      try {
        const { clientId, firstName, lastName, email, phone, address } = args;
        const updatedUser = await User.findOneAndUpdate(
          { _id: clientId },
          { firstName, lastName, email, phone, address },
          { returnDocument: 'after', runValidators: true }
        );
        return updatedUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  //Field resolver to format date
  User: {
    ...timestampFields,
    //Field resolver to obtain number of orders per user
    noOfOrders: (document) => document.orders.length,
  },
  Service: timestampFields,
  Order: timestampFields,
};

module.exports = resolvers;
