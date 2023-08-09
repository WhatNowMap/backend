// Router
const router = require("express").Router();
// Import - event controller
const eventController = require("../controllers").eventController;
// Get Request
// Get All Events
router.get("/", eventController.getAllEvents)

module.exports = router;