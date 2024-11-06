const { expressjwt: jwtMiddleware } = require('express-jwt');
const accessTokenSecret  = process.env.ACCESS_TOKEN_SECRET;

// Middleware for validating JWT token
const authenticateToken = jwtMiddleware({
  secret: accessTokenSecret,
  algorithms: ['HS256'],
  requestProperty: 'user'
});

module.exports = authenticateToken;
