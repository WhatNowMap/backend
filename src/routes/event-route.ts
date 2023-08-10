// Router
const router = require("express").Router();
// Import - event controller
const eventController = require("../controllers").eventController;

// Get Request
// Get all the events
router.get("/", eventController.getAllEvents)
// Get the details of an event
router.get("/:event_id", eventController.getEventDetails);
// Get user's event history
router.get("/host/:user_id", eventController.getUserEventHistory);



// POST Request
// Create a new event
router.post("/", eventController.addNewEvent);
// Vote Event
router.post("/eventRating/:event_id/type/:type", eventController.voteEvent)
module.exports = router;