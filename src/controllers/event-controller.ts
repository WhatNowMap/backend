const { Event, Upvote, Downvote, Bookmark } = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = mongoose;

// Functions

module.exports.getAllEvents = async function (req, res) {
  try {
    const foundEvents = await Event.find({})
      .populate("userId", ["userName"])
      .exec();
    res.status(200).send(foundEvents);
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports.getUserEventHistory = async function (req, res) {
  const userId = req.params.user_id;
  try {
    const foundEvents = await Event.find({ userId })
      .populate("userId", ["userName"])
      .exec();
    res.status(200).send(foundEvents);
  }
  catch (err) {
    res.status(500).send(err);
  }
}

module.exports.getEventDetails = async function (req, res) {
  const _id = req.params.event_id;
  try {
    const foundEvent = await Event.findOne({ _id })
      .populate("userId", ["userName"])
      .exec();
    console.log(foundEvent);
    res.status(200).send(foundEvent);

  }
  catch (err) {
    res.status(500).send(err);
  }
}

module.exports.voteEvent = async function (req, res) {
  try {
    // const userId = req.user._id;
    // temporary User ID, without real user
    const userId = "testingUserId";
    if (!userId) return res.status(400).send({ errorMessage: "You are not logged in" })
    const eventId = req.params.event_id;
    const { type } = req.params;

    if (type === "upvote") {
      // Check if user up-voted before
      const foundUpvote = await Upvote.findOne({ userId, eventId }).exec();
      if (foundUpvote) {
        return req.status(400).send("You up-voted it before");
      }
      // Check if user down-voted before
      // if yes, remove it
      const foundDownvote = await Downvote.find({ userId, eventId }).exec();
      if (foundDownvote) {
        await Downvote.removeOne({ _id: foundDownvote._id }).exec();
      }

      const newUpvote = new Upvote({ userId, eventId });
      const savedUpvote = await newUpvote.save();
      return res.status(200).send({ message: "The up-vote is created", savedUpvote })
    }
    else if (type === "downvote") {
      const foundDownvote = await Downvote.findOne({ userId, eventId }).exec();
      if (foundDownvote) {
        return req.status(400).send("You down-voted it before");
      }

      const foundUpvote = await Upvote.find({ userId, eventId }).exec();
      if (foundUpvote) {
        await Upvote.removeOne({ _id: foundUpvote._id }).exec();
      }

      const newDownvote = new Downvote({ userId, eventId });
      const savedDownvote = await newDownvote.save();
      return res.status(200).send({ message: "The down-vote is created", savedDownvote });
    }
  }
  catch (err) {
    res.status(500).send(err);
  }
}

module.exports.getUserSavedEvent = async function (req, res) {
  // Temporary without userId
  
}

module.exports.addNewEvent = async function (req, res) {
  try {
    const { category, location, lag, lng, description, posterJson } = req.body;
    // temporary without userId
    // userId = req.user._id;
    // const userId = new ObjectId();
    const newEvent = new Event(
      {
        category, location, lag, lng, description, posterJson,
        createAt: Date.now(), updateAt: Date.now(), ranking: 0
      }
    );

    console.log(newEvent);


    const savedEvent = await newEvent.save();
    res.status(200).send({ message: "The event is created successfully", savedEvent })
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}