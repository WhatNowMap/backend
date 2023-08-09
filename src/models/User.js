const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  id: Number,
  nameName: String,
  password: String,
  email: String,
  fixedLocation: String,
  tag: Array
},{ collection: 'users' });

module.exports = mongoose.model('User', userSchema)