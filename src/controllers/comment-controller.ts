// get comment create comment
const { Comment } = require("../models");
const mongoose = require("mongoose");
const { ObjectId } = mongoose;

exports.createComment = async function (req, res) {
  try {
    const { comment, eventId, mediaIds } = req.body;
    // userId = req.user._id;
    const userId = "64d5293ef60b86a66706e65d";
    const newComment = new Comment({
      comment,
      eventId,
      mediaIds,
      createAt: new Date(),
      updatedAt: new Date(),
      userId: req.user._id,
      // userId,
    });

    const addComment = await newComment.save();
    res.status(200).send({ message: "Commented Successfully.", addComment });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getCommentDetail = async function (req, res) {
  try {
    const _id = req.params.comment_id;
    const comments = await Comment.findOne({ _id })
      .populate("userId", "userName avatar")
      .exec();
    console.log(comments);
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.getCommentsforEvent = async function (req, res) {
  try {
    const _id = req.params.event_id;
    const comments = await Comment.find({ eventId: _id })
      .populate("userId", "userName avatar")
      .exec();
    console.log(comments);
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

// Not necessary at this Stage.
exports.getCommentsforUser = async function (req, res) {
  try {
    // const userId = req.user._id;
    const userId = "64da67a70c79bf282c2afd9d";
    const comments = await Comment.find({ userId: userId }).exec();
    console.log(comments);
    res.status(200).send(comments);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
