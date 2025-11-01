const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
require('dotenv').config();

// Database connection
const database = require('./database/db');

// const authRoutes = require('./routes/authRoutes');
// const protectedRoutes = require('./routes/protectedRoutes');

// ✅ CORS Configuration
app.use(
    cors({
        origin: [
            'http://localhost:5173'
        ],
        credentials: true,
    })
);

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// Connect to MongoDB
database();

// app.use('/auth', authRoutes);
// app.use('/protected', protectedRoutes);


app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});

module.exports = app;
