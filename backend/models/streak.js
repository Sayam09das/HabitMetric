const mongoose = require('mongoose');
const { Schema } = mongoose;

const StreakSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    streak: { type: Number, default: 0 },
    totalCheckIns: { type: Number, default: 0 },
    lastCheckin: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { versionKey: false });

StreakSchema.index({ habit: 1, user: 1 }, { unique: true });

StreakSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

module.exports = mongoose.models.Streak || mongoose.model('Streak', StreakSchema);
