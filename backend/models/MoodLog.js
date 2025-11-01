const mongoose = require('mongoose');

const moodLogSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mood: { type: String, required: true }, // e.g. "happy", "anxious"
    note: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MoodLog', moodLogSchema);
