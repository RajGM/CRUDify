const express = require('express');
const { pool } = require('./config/db'); // Assuming db.js exports a pool
require('dotenv').config();
const authRoutes = require('./api/routes/authRoutes');
const jokeRoutes = require('./api/routes/jokeRoutes');
//const userRoutes = require('./api/routes/userRoutes');
//const errorHandlerMiddleware = require('./api/middleware/errorHandlerMiddleware');
const cors = require('cors'); // Import CORS module

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Or '*' for allowing any origin (not recommended for production)
    credentials: true, // If your frontend needs to send cookies or authorization headers
}));

app.use(express.json()); // For parsing application/json
app.use('/api/auth', authRoutes);
app.use('/api/jokes', jokeRoutes);
//app.use('/api/users', userRoutes);
//app.use(errorHandlerMiddleware); // Central error handling

module.exports = app;
