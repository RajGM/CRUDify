const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Assuming you're using Firebase for user authentication,
// these routes might be for registering a new user or obtaining user-specific tokens
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
