const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const commentSchema = new Schema({
    id: Number,
    comment: String,
    createdAt: Date,
    updatedAt: Date,
    eventId: {
        type: ObjectId,
        ref: "Event"
    }
},{ collection: 'comments' });

module.exports = mongoose.model('Comment ', commentSchema)