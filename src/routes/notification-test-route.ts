// Router
const router = require("express").Router();
// Import - notification TEST controller
const testController = require("../controllers/notifications/notification-controller");

// POST Request
// Send a notification
router.post("/", testController.notify);

module.exports = router;
