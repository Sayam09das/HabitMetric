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

router.get('/:habitId', authenticateToken, async (req, res) => {
    try {
        const habitId = req.params.habitId;
        const userId = req.user.id;
        const streakDoc = await Streak.findOne({ habit: habitId, user: userId }).lean();
        if (streakDoc) return res.json({ success: true, streak: streakDoc });
        const habit = await Habit.findOne({ _id: habitId, user: userId }).lean();
        if (!habit) return res.status(404).json({ success: false, message: 'Not found' });
        return res.json({ success: true, streak: { habit: habit._id, user: habit.user, streak: habit.streak ?? 0, totalCheckIns: null, lastCheckin: habit.lastCheckin ?? null, fallback: true } });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
