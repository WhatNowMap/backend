// Router
const router = require("express").Router();
// Import - event controller
const commentController = require("../controllers").commentController;

// POST Request
// Make a new Comment to an Event
router.post("/", commentController.createComment);

// GET Request
// Get all comments of an Event
router.get("/:event_id", commentController.getCommentsforEvent);
// Get user's comment history
router.get("/:user_id", commentController.getCommentsforUser);

module.exports = router;
