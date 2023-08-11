// get comment create comment
const { User, Comment } = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = mongoose;

exports.module.createComment = async function (req, res) {
  try {
    const { comment, eventId, contributorUserId } = req.body;
    // userId = req.user._id;
    const userId = "64d5293ef60b86a66706e65d";
    const newComment = new Comment({
      comment,
      eventId,
      contributorUserId,
      createAt: new Date(),
      updatedAt: new Date(),
    });

    const addComment = await newComment.save();
    res.status(200).send({ message: "Commented Successfully.", addComment });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.module.getCommentsforEvent = async function (req, res) {
  try {
    const { eventId } = req.body;
    const comments = Comment.find({ eventId })
      .populate("userId", "userName avatar")
      .exec();
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// Not necessary at this Stage.
exports.module.getCommentsforUser = async function (req, res) {
  try {
    // const userId = req.user._id;
    const userId = "64d5293ef60b86a66706e65d";
    const comments = Comment.find({ userId }).exec();
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
