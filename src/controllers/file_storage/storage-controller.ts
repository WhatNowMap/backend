import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

async function uploadFileToFirebase(file, userId, mediaId) {
  const destinationPath = `${userId}/${mediaId}/${file.originalname}`;

  // Create a root reference
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  const metadata = {
    contentType: file.mimetype,
  };

  // Create a reference to file
  const storageRef = ref(storage, destinationPath);
  const contentArray = new Uint8Array(file.buffer);

  await uploadBytes(storageRef, contentArray, metadata).then((snapshot) => {
    console.log("SUCCESS_UPLOAD: Uploaded a blob or file!");
  });
}

exports.uploadBinary = async function (req, res) {
  try {
    const file = req.file;
    // const userId = req.user._id;
    const userId = "64da67a70c79bf282c2afd9d";
    console.log(req.file);
    uploadFileToFirebase(file, userId, "media_id");
    res.status(200).send({ message: "File Received & Uploaded to FireBase" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};
