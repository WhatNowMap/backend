const Event = require("../models").event;

module.exports.getAllEvent = async function (req, res) {
  try {
    const foundEvents = await Event.find({}).populate("userId", ["userName"])
      .exec();
  }
  catch (err) {

  }
}