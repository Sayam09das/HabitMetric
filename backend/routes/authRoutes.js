const express = require('express');
const router = express.Router();
const {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    // forgotPassword,
    // verifyOtp,
    // resetPassword,
    // resendOtp,
    // getCurrentUser,
} = require('../controllers/userController');

// ✅ Import with exact casing
const { authenticateToken } = require('../middleware/authMiddleware');


// Auth routes
router.post('/register', registerUser);
router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
// router.post('/forgot-password', forgotPassword);
// router.post('/verify-otp', verifyOtp);
// router.post('/reset-password', resetPassword);
// router.post('/resend-otp', resendOtp);
// router.get('/me', authenticateToken, getCurrentUser);

router.get('/test', authenticateToken, (req, res) => {
    res.json({ message: 'Auth protected route works fine!' });
});


module.exports = router;
