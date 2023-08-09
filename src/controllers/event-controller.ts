const Event = require("../models").event;

module.exports.getAllEvents = async function (req, res) {
  try {
    const foundEvents = await Event.find({})
      .populate("userId", ["userName", "userId"])
      .exec();
    res.send(foundEvents);
  }
  catch (err) {
    console.log(err);
  }
}