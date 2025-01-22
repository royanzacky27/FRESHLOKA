const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] },
    password: { type: String, required: true },
    name: { type: String },
    address: { type: String },
    gender: { type: String, enum: ['MALE', 'FEMALE'] },
    phoneNumber: { type: String },
    is_admin: { type: Boolean, default: false }
}, {
    collection: 'users'
});

// Hash password sebelum menyimpan user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method untuk memverifikasi password
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
