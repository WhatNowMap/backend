// Router
const router = require("express").Router();
// Import - event controller
const userController = require("../controllers").userController;

// Get Request
// get bookmark
router.post("/bookmarks", userController.getUserBookmarks)

// Post Request
// add bookmark
router.post("/bookmark/:is_bookmark/:event_id", userController.bookmarkEvent)

// Exports
module.exports = router;