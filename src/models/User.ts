const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: Number,
    userName: String,
    password: String,
    email: String,
    provider: String,
    createAt: Date,
    fixedLocation: String,
    tag: Array,
  },
  { collection: 'users' }
);

module.exports = mongoose.model('User', userSchema);
