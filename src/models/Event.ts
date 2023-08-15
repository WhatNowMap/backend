const mongoose = require("mongoose");
const { Schema, ObjectId } = mongoose;

const eventSchema = new Schema(
  {
    id: Number,
    category: {
      type: String,
      enum: ["A", "B", "C"],
      default: "",
    },
    createdAt: Date,
    updatedAt: Date,
    location: String,
    lag: String,
    lng: String,
    description: String,
    mediaIds: [
      {
        type: ObjectId,
        ref: "Media",
      },
    ],
    ranking: Number,
    userId: {
      type: ObjectId,
      ref: "User",
    },
  },
  { collection: "events" }
);

module.exports = mongoose.model("Event", eventSchema);
