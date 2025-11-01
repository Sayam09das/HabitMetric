const User = require('../models/userModels');
const sendEmail = require('../utils/sendEmail'); // Updated SendGrid version
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// ===== HELPER: Generate Secure Verification Token =====
const generateVerificationToken = () => crypto.randomBytes(32).toString('hex');

// ===== LOGIN RATE LIMITER =====
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again later.',
});

// ===== REGISTER USER =====
exports.registerUser = [
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6, max: 12 }).withMessage('Password must be 6-12 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { name, email, password, country, phoneNumber } = req.body;
        const normalizedEmail = email.toLowerCase();

        try {
            const existing = await User.findOne({ email: normalizedEmail });
            if (existing) return res.status(409).json({ message: 'Email already exists' });

            const hashedPassword = await bcrypt.hash(password, 12);
            const verificationToken = generateVerificationToken();
            const tokenExpires = Date.now() + 24 * 60 * 60 * 1000;

            const newUser = new User({
                name,
                email: normalizedEmail,
                password: hashedPassword,
                country,
                phoneNumber,
                isVerified: false,
                verificationToken,
                tokenExpires
            });

            await newUser.save();

            const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(normalizedEmail)}`;

            const emailContent = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Verify Your Email</title>
                        </head>
                        <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f7; color: #333;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; margin-top:20px; box-shadow:0 4px 8px rgba(0,0,0,0.1);">
                                
                                <!-- Header -->
                                <tr>
                                    <td style="background-color:#4f46e5; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
                                    BattleIq
                                    </td>
                                </tr>

                                <!-- Body -->
                                <tr>
                                    <td style="padding:30px; text-align:left; font-size:16px; line-height:1.5;">
                                    <p>Hi ${name},</p>
                                    <p>Welcome to <strong>BattleIq</strong>! Please verify your email to complete your registration and start using your account.</p>

                                    <p style="text-align:center; margin:30px 0;">
                                        <a href="${verificationLink}" target="_blank" style="background-color:#4f46e5; color:#ffffff; text-decoration:none; padding:15px 25px; border-radius:5px; display:inline-block; font-weight:bold;">
                                        Verify Email
                                        </a>
                                    </p>

                                    <p>This link will expire in 24 hours. If you did not create an account, you can safely ignore this email.</p>

                                    <p>Cheers,<br>Team BattleIq</p>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color:#f4f4f7; padding:20px; text-align:center; font-size:12px; color:#888888;">
                                    &copy; ${new Date().getFullYear()} BattleIq. All rights reserved.<br>
                                    5B, Swarnamukur Apartment, Rabindra Nagar, Midnapore, West Bengal 721101, India
                                    </td>
                                </tr>

                                </table>
                            </td>
                            </tr>
                        </table>
                        </body>
                        </html>
            `;


            await sendEmail(normalizedEmail, 'Verify your BattleIq account', emailContent);

            res.status(201).json({
                message: `🎉 Registration Successful!  
                            Your account has been created. Please check your inbox (and Spam/Promotions folder) for a verification email from BattleIq.  
                            Click the "Verify Email" button in that email to activate your account.`
            });


        } catch (err) {
            console.error(err);

            if (err.code === 11000 && err.keyPattern?.email) {
                return res.status(409).json({ message: 'Email already exists' });
            }

            res.status(500).json({ message: 'Server error' });
        }
    }
];

// ===== VERIFY EMAIL =====
exports.verifyEmail = async (req, res) => {
    const { token, email } = req.query;
    if (!token || !email) return res.status(400).json({ message: 'Invalid verification link' });

    try {
        const decodedEmail = decodeURIComponent(email).toLowerCase();
        const user = await User.findOne({ email: decodedEmail, verificationToken: token });

        if (!user) {
            const alreadyVerifiedUser = await User.findOne({ email: decodedEmail });
            if (alreadyVerifiedUser && alreadyVerifiedUser.isVerified) {
                const jwtToken = jwt.sign(
                    { id: alreadyVerifiedUser._id, name: alreadyVerifiedUser.name, email: alreadyVerifiedUser.email },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRATION || '1h' }
                );
                res.cookie('authToken', jwtToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'None',
                    maxAge: 3600000,
                });
                return res.status(200).json({
                    message: 'Email already verified successfully.',
                    token: jwtToken,
                    user: {
                        id: alreadyVerifiedUser._id,
                        name: alreadyVerifiedUser.name,
                        email: alreadyVerifiedUser.email,
                        phoneNumber: alreadyVerifiedUser.phoneNumber,
                        country: alreadyVerifiedUser.country
                    }
                });
            }
            return res.status(400).json({ message: 'Invalid token or email' });
        }

        if (user.isVerified) return res.status(400).json({ message: 'Email already verified' });
        if (user.tokenExpires < Date.now()) return res.status(400).json({ message: 'Token expired. Please register again.' });

        user.isVerified = true;
        user.verificationToken = undefined;
        user.tokenExpires = undefined;
        await user.save();

        const jwtToken = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION || '1h' }
        );

        res.cookie('authToken', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
            maxAge: 3600000,
        });

        res.status(200).json({
            message: 'Email verified successfully!',
            token: jwtToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                country: user.country
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


// ===== LOGIN USER =====
exports.loginUser = [
    loginLimiter,
    body('email').isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;
        const normalizedEmail = email.toLowerCase();

        try {
            const user = await User.findOne({ email: normalizedEmail });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

            if (!user.isVerified) return res.status(403).json({ message: 'Email not verified.' });

            const token = jwt.sign(
                { id: user._id, name: user.name, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRATION || '1h' }
            );

            // ✅ Set JWT cookie for login
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'None',
                maxAge: 3600000,
            });

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    country: user.country
                }
            });

        } catch (error) {
            if (error.response?.status === 401) {
                showToast(error.response.data.message || 'Invalid email or password', 'error');
            } else if (error.response?.status === 404) {
                showToast(error.response.data.message || 'User not found', 'error');
            } else {
                showToast(error.response?.data?.message || 'Server error occurred', 'error');
            }
        }

    }
];


// ===== LOGOUT USER =====
exports.logoutUser = async (req, res) => {
    try {
        // Extract Bearer token if provided
        const token = req.headers.authorization?.split(' ')[1];

        // Clear cookie if exists
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        });

        // (Optional) If you want to blacklist bearer tokens, you can store them here
        // e.g., blacklistedTokens.add(token);

        console.log('Logout request processed. Token:', token || 'No token found');

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};




// ===== FORGOT PASSWORD =====
exports.forgotPassword = [
    body('email').isEmail().withMessage('Valid email required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const otp = generateOtp();
            const otpExpires = Date.now() + 5 * 60 * 1000;

            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();

            const subject = `Schedulo Password Reset – OTP Inside`;
            const text = `
Hi ${user.name},

🛡️ Your password reset OTP is: ${otp}  
⏳ It expires in 5 minutes.

Click to reset: https://schedulo-task.app/reset-password

If you didn’t request this, ignore this email.

— The Schedulo Team
            `;

            // await sendEmail(email, subject, text);
            res.status(200).json({ message: 'OTP sent to email' });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
];

// ===== VERIFY OTP =====
exports.verifyOtp = [
    body('email').isEmail().withMessage('Valid email required'),
    body('otp').isLength({ min: 4, max: 12 }).withMessage('OTP must be 4–12 digits'),

    async (req, res) => {
        const { email, otp } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'User not found' });


            if (String(user.otp) !== String(otp)) {
                return res.status(400).json({ message: 'Invalid OTP' });
            }

            if (Date.now() > user.otpExpires) {
                return res.status(400).json({ message: 'OTP has expired' });
            }

            user.otp = null;
            user.otpExpires = null;
            user.resetVerified = true;
            await user.save();

            res.status(200).json({ message: 'OTP verified. Proceed to reset password.' });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
];





// ===== RESEND OTP =====
exports.resendOtp = [
    body('email').isEmail().withMessage('Valid email required'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'User not found' });

            const otp = generateOtp();
            const otpExpires = Date.now() + 5 * 60 * 1000;

            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();

            const subject = 'Schedulo – Resend OTP';
            const text = `
Hi ${user.name},

🔁 Your new OTP is: ${otp}  
⏳ It expires in 5 minutes.

Use it to verify your account or reset your password.

— The Schedulo Team
            `;

            // await sendEmail(email, subject, text);
            res.status(200).json({ message: 'New OTP sent successfully to your email' });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
];

exports.resetPassword = [
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user || !user.resetVerified) {
                return res.status(400).json({ message: 'User not verified for reset' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
            user.resetVerified = false;
            await user.save();

            res.status(200).json({ message: 'Password has been reset successfully' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
];

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('name email createdAt');
        if (!user) return res.status(404).json({ message: 'User not found' });

        const avatar = user.name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();

        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                avatar,
                joinDate: new Date(user.createdAt).toLocaleString('default', {
                    month: 'long',
                    year: 'numeric'
                })
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};