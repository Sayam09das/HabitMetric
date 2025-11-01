const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/userModels');
const { authenticateToken } = require('../middleware/authMiddleware');

// ===== Dashboard Route =====
router.get('/dashboard', authenticateToken, (req, res) => {
    res.status(200).json({
        message: 'This is your dashboard',
        user: req.user
    });
});

// ===== Get Current User Profile =====
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -otp -otpExpires');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User profile fetched successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ===== Update User Profile =====
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { name, country, phoneNumber } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (name) user.name = name;
        if (country) user.country = country;
        if (phoneNumber) user.phoneNumber = phoneNumber;

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ===== Change Password =====
router.put('/password', authenticateToken, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword)
            return res.status(400).json({ message: 'Old and new passwords are required' });

        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Incorrect old password' });

        if (newPassword.length < 6 || newPassword.length > 12) {
            return res.status(400).json({ message: 'Password must be 6–12 characters' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ===== Delete Account =====
router.delete('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
