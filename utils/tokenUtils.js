const jwt = require('jsonwebtoken');

// Secret keys from environment variables
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'helloworld';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'helloworld-refresh-secret-key';

// Generate Access Token (1 hour expiry)
const generateAccessToken = (user) => {
  return jwt.sign(user, accessTokenSecret, { expiresIn: '1h' });
};

// Generate Refresh Token (30 days expiry)
const generateRefreshToken = (user) => {
  return jwt.sign(user, refreshTokenSecret, { expiresIn: '30d' });
};

// Verify Access Token
const verifyAccessToken = (token) => {
  return jwt.verify(token, accessTokenSecret);
};

// Verify Refresh Token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, refreshTokenSecret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken
};
