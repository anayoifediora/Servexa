const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const expiration = '30m';

module.exports = {
  authMiddleware: function ({ req }) {
    // allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return { user: null };
    }

    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return { user: data };
    } catch (err) {
      console.log('Invalid token');
      return { user: null };
    }
  },
  signToken: function (userInfo) {
    const { email, username, _id, role } = userInfo;
    const payload = { email, username, _id, role };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
