import {
  uploadFileToFirebase,
  addNewMediatoMongoDB,
} from "./storage-operations";

exports.uploadBinary = async function (req, res) {
  try {
    const file = req.file;
    // const userId = req.user._id;
    const userId = "64da67a70c79bf282c2afd9d";
    console.log(req.file);
    const destinationPath = `${file.originalname}`;
    const mediaId = await addNewMediatoMongoDB(destinationPath, userId);
    uploadFileToFirebase(file, userId, mediaId);

    res.status(200).send({ message: "File Received & Uploaded to FireBase" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
