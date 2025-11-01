const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    resetToken: { type: String },
    resetTokenExpires: { type: Date },

    // ===== Email Verification Fields =====
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    tokenExpires: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
