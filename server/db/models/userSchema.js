const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  role: { type: String, enum: ['doctor', 'staff', 'patient'], default: 'patient' },
  profile: {
    name: String,
    email: String,
  },
},{ timestamps:true });

const users = mongoose.model('user',userSchema);

module.exports = users;