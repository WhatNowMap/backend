// Router
const router = require("express").Router();
// Import - event controller
const userController = require("../controllers").userController;

// Get Request
// get bookmark
router.get("/bookmarks", userController.getUserBookmarks)

// Post Request
// add bookmark
router.post("/bookmark/:is_bookmark/:event_id", userController.bookmarkEvent)

router.get('/profile/:userId', userController.getProfile)

router.post('/update/:userId', userController.updateUserProfile)

module.exports = router;