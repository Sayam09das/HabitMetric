const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const MoodLog = require('../models/MoodLog');

// POST /mood
// body: { mood: "happy", note: "had a great run" }
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { mood, note } = req.body;

        if (!mood) {
            return res.status(400).json({ success: false, message: 'Mood is required' });
        }

        const moodEntry = new MoodLog({
            user: req.user.id,
            mood,
            note
        });

        await moodEntry.save();

        return res.status(201).json({
            success: true,
            message: "Mood logged successfully",
            mood: moodEntry
        });

    } catch (err) {
        console.error("Mood Log Error:", err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// GET /mood (fetch mood logs)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const moods = await MoodLog.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: moods });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

module.exports = router;
