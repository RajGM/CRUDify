const express = require('express');
const { pool } = require('./config/db'); // Assuming db.js exports a pool
require('dotenv').config();
//const authRoutes = require('./api/routes/authRoutes');
const jokeRoutes = require('./api/routes/jokeRoutes');
//const userRoutes = require('./api/routes/userRoutes');
//const errorHandlerMiddleware = require('./api/middleware/errorHandlerMiddleware');

const app = express();

app.use(express.json()); // For parsing application/json
//app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokeRoutes);
//app.use('/api/users', userRoutes);
//app.use(errorHandlerMiddleware); // Central error handling

module.exports = app;
