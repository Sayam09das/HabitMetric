// routes/habit.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

const Habit = require('../models/Habit');
const HabitLog = require('../models/HabitLog');
const Streak = require('../models/streak');

const startOfDayUTC = (d) => {
    const date = new Date(d);
    date.setUTCHours(0, 0, 0, 0);
    return date;
};

const daysBetween = (a, b) => {
    const da = startOfDayUTC(a);
    const db = startOfDayUTC(b);
    return Math.round((da - db) / (1000 * 60 * 60 * 24));
};

// POST /habit - create habit (kept as you had)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description, frequency = 'daily', target = 1 } = req.body;
        if (!title) return res.status(400).json({ success: false, message: 'Title required' });

        const habit = await Habit.create({
            user: req.user.id,
            title,
            description,
            frequency,
            target
        });

        res.status(201).json({ success: true, habit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /habit - user habits
router.get('/', authenticateToken, async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, habits });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// PATCH /habit/:id - update habit
router.patch('/:id', authenticateToken, async (req, res) => {
    try {
        const updates = (({ title, description, frequency, target, enabled }) =>
            ({ title, description, frequency, target, enabled }))(req.body);

        const habit = await Habit.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: updates },
            { new: true }
        );

        if (!habit) return res.status(404).json({ success: false, message: 'Habit not found' });

        res.json({ success: true, habit });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// POST /habit/checkin - main route (real-time emit included)
router.post('/checkin', authenticateToken, async (req, res) => {
    try {
        const { habitId, note } = req.body;
        if (!habitId) return res.status(400).json({ success: false, message: 'habitId required' });

        const habit = await Habit.findOne({ _id: habitId, user: req.user.id });
        if (!habit) return res.status(404).json({ success: false, message: 'Habit not found' });
        if (!habit.enabled) return res.status(400).json({ success: false, message: 'Habit disabled' });

        const now = new Date();
        const today = startOfDayUTC(now);

        // Prevent duplicate check-ins for the same UTC day
        const existing = await HabitLog.findOne({
            habit: habit._id,
            user: req.user.id,
            date: { $gte: today, $lt: new Date(today.getTime() + 86400000) }
        });

        if (existing) return res.status(400).json({ success: false, message: 'Already checked in today' });

        // Save habit log
        const log = await HabitLog.create({
            habit: habit._id,
            user: req.user.id,
            date: now,
            success: true,
            note
        });

        // Compute new streak value based on lastCheckin
        let newStreak = 1;
        if (habit.lastCheckin) {
            const diff = daysBetween(now, habit.lastCheckin);
            if (diff === 1) newStreak = (habit.streak || 0) + 1;
            else if (diff === 0) newStreak = habit.streak || 0;
            else newStreak = 1;
        }

        // Update Habit doc (keeps backward compatibility)
        habit.streak = newStreak;
        habit.lastCheckin = now;
        await habit.save();

        // Atomically upsert the Streak document
        const streakDoc = await Streak.findOneAndUpdate(
            { habit: habit._id, user: req.user.id },
            {
                $set: { lastCheckin: now, streak: newStreak, updatedAt: new Date() },
                $inc: { totalCheckIns: 1 },
                $setOnInsert: { createdAt: new Date() }
            },
            { upsert: true, new: true }
        );

        // Emit real-time event via Socket.IO (if available)
        try {
            const io = req.app.get('io');
            if (io) {
                io.to(`user:${req.user.id}`).emit('streakUpdated', {
                    habitId: habit._id.toString(),
                    streak: streakDoc.streak,
                    totalCheckIns: streakDoc.totalCheckIns,
                    lastCheckin: streakDoc.lastCheckin
                });
            }
        } catch (emitErr) {
            console.error('emit error', emitErr);
            // don't fail the request if emit fails
        }

        res.status(201).json({ success: true, log, habit, streak: streakDoc });
    } catch (err) {
        console.error('checkin error', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
