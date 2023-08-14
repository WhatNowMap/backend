// Router & Multer
const router = require("express").Router();
const multer = require("multer");
// Import - event controller
const storageController = require("../controllers/file_storage/storage-controller");
// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "storage/uploads/media");
//   },
//   filename(req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });
const upload = multer();
// POST Request
// Make a new Comment to an Event
router.post("/upload", upload.single("media"), storageController.uploadBinary);

// GET Request
// Get all comments of an Event
// router.get("/event/:event_id", storageController.getCommentsforEvent);

module.exports = router;
