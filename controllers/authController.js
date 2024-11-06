const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../utils/tokenUtils');

// Sign-up Logic
const signUp = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  // Validation
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Check if email is already taken
  const existingUser = await db('Users').where({ email }).first();
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists.' });
  }

  // Password validation
  if (password.length < 8 || password.length > 20) {
    return res.status(400).json({ message: 'Password must be between 8 and 20 characters.' });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into database
  const [userId] = await db('Users').insert({
    firstName,
    lastName,
    email,
    hash: hashedPassword
  });

  res.status(201).json({
    id: userId,
    firstName: `${firstName}`,
    lastName: `${lastName}`,
    email: `${email}`,
    displayName: `${firstName} ${lastName}`
  });
};

// Sign-in Logic
const signIn = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Find user
  const user = await db('Users').where({ email }).first();
  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  // Compare password with stored hash
  const isMatch = await bcrypt.compare(password, user.hash);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  // Generate tokens
  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

  // Store refresh token in the database
  await db('Tokens').insert({
    userId: user.id,
    refreshToken,
    expiresIn: '30d'
  });

  res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: `${user.firstName} ${user.lastName}`
    },
    token: accessToken,
    refreshToken
  });
};

// Sign-out Logic
const signOut = async (req, res) => {
  const userId = req.user.id; // From JWT middleware

  // Delete all refresh tokens for the user
  await db('Tokens').where({ userId }).del();

  res.status(204).send();
};

// Refresh Token Logic
const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  // Validate refresh token
  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  // Check if refresh token exists in the database
  const tokenRecord = await db('Tokens').where({ refreshToken }).first();
  if (!tokenRecord) {
    return res.status(404).json({ message: 'Invalid refresh token.' });
  }

  // Verify and generate new tokens
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ id: decoded.id, email: decoded.email });
    const newRefreshToken = generateRefreshToken({ id: decoded.id, email: decoded.email });

    // Invalidate old refresh token and insert new one
    await db('Tokens').where({ refreshToken }).del();
    await db('Tokens').insert({
      userId: decoded.id,
      refreshToken: newRefreshToken,
      expiresIn: '30d'
    });

    res.status(200).json({ token: newAccessToken, refreshToken: newRefreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Failed to refresh token.' });
  }
};

module.exports = { signUp, signIn, signOut, refreshToken };
