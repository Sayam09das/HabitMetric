const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'custom'], default: 'daily' },
    target: { type: Number, default: 1 },
    enabled: { type: Boolean, default: true },
    streak: { type: Number, default: 0 },
    lastCheckin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Habit', habitSchema);
