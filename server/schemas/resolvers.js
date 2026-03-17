const { ApolloServer } = require('@apollo/server');
const { GraphQLError } = require('graphql');
const { signToken } = require('../utils/auth');
const { User, Service } = require('../models');
const { checkAuth } = require('../helpers');
const bcrypt = require('bcrypt');

const resolvers = {
  //Query section
  Query: {
    //List all users
    users: async (parent, args, context) => {
      console.log(context.user);
      checkAuth(context);
      return User.find();
    },
    //List all Services
    services: async () => {
      return await Service.find();
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
    //Update user password
    updatePassword: async (parent, { oldPassword, newPassword, email }) => {
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
  },
};

module.exports = resolvers;
