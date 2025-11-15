// server.js
require('dotenv').config();
const http = require('http');
const jwt = require('jsonwebtoken');
const app = require('./app'); // your express app
const { Server } = require('socket.io');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:5173',
            'https://habit-metric.vercel.app'
        ],
        credentials: true
    }
});

// Socket auth middleware using JWT (client should send auth token)
io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.query?.token;
    if (!token) return next(new Error('Authentication error: token required'));

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return next(new Error('Authentication error: invalid token'));
        socket.user = payload; // ensure payload contains user id (e.g. { id: '...' })
        return next();
    });
});

io.on('connection', (socket) => {
    const userId = socket.user?.id;
    if (userId) {
        socket.join(`user:${userId}`);
    }

    socket.on('join', (data) => {
        if (data && data.userId) socket.join(`user:${data.userId}`);
    });

    socket.on('disconnect', () => {
        // cleanup if needed
    });
});

// Make io accessible to routes via app
app.set('io', io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
