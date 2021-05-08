const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		select: false,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	mobile: {
		type: Number,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['customer', 'admin', 'serviceprovider'],
		default: 'customer',
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};
const User = mongoose.model('User', userSchema);
module.exports = User;
