const mongoose = require('mongoose');

const habitLogSchema = new mongoose.Schema({
    habit: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    success: { type: Boolean, default: true },
    note: { type: String },
    createdAt: { type: Date, default: Date.now }
});

habitLogSchema.index({ habit: 1, user: 1, date: 1 });

module.exports = mongoose.model('HabitLog', habitLogSchema);
