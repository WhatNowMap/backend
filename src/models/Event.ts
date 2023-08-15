const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const eventSchema = new Schema({
  id: Number,
  name: String,
  category: {
    type: String,
    enum: ["A", "B", "C"],
    default: ''
  },
  createdAt: Date,
  updatedAt: Date,
  location: String,
  lag: String,
  lng: String,
  description: String,
  posterJson: String,
  ranking: Number,
  userId: {
    type: ObjectId,
    ref: "User"
  }
}, { collection: 'events' });

module.exports = mongoose.model('Event', eventSchema)