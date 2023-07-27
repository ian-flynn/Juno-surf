const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, required: false },
  username: { type: String, required: true },
  beachCode: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);
