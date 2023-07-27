const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  beachCode: { type: String, default: 'temp' },
});

module.exports = mongoose.model('User', userSchema);
