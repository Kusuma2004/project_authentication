const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare plain password with hashed one
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// ✅ Bind to 'project_user' collection
const User = mongoose.model('User', userSchema, 'project_user');
module.exports = User;
