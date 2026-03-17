const { GraphQLError } = require('graphql');

const checkAuth = (context) => {
  if (!context.user) {
    throw new GraphQLError('Authentication required');
  }
};

module.exports = { checkAuth };
