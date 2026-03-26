const { GraphQLError } = require('graphql');


const checkAuthorization = (context, allowedRoles = []) => {
  if (!context.user) {
    throw new GraphQLError("Authentication required", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }

  if (!allowedRoles.includes(context.user.role)) {
    throw new GraphQLError("Access denied. You do not have permission.", {
      extensions: { code: "FORBIDDEN" },
    });
  }
};
const formatDate = (date) => new Date(date).toLocaleString();

module.exports = { formatDate, checkAuthorization };
