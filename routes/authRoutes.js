const express = require('express');
const { signUp, signIn, signOut, refreshToken } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', authenticateToken, signOut);
router.post('/refresh-token', refreshToken);

module.exports = router;
