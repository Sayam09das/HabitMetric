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


const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const habitRoutes = require('./routes/habit');
const moodRoutes = require('./routes/mood');
const streakRoutes = require('./routes/StreakRoutes')


// ✅ CORS Configuration
app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://habit-metric.vercel.app'
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

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);
app.use('/habit', habitRoutes);
app.use('/mood', moodRoutes);
app.use('/streak', streakRoutes);


app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    next();
});

app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

module.exports = app;
