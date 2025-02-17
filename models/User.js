import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },  // Role field (default is 'user')
  lastLogin: { type: Date },  // Optional: For tracking login
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
