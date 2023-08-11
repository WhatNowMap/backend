// Router
const router = require("express").Router();
// Import - event controller
const commentController = require("../controllers/comment-controller");

// POST Request
// Make a new Comment to an Event
router.post("/", commentController.createComment);

// GET Request
// Get all comments of an Event
router.get("/event/:event_id", commentController.getCommentsforEvent);
// Get user's comment history
router.get("/user/:user_id", commentController.getCommentsforUser);

module.exports = router;
