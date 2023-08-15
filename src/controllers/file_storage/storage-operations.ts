import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";
const { Media } = require("../../models");
const mongoose = require("mongoose");

async function addNewMediatoMongoDB(path, userId) {
  try {
    const newMedia = new Media({
      path: path,
      userId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log(newMedia._id.toString());
    const saveMedia = await newMedia.save();
    return newMedia._id.toString();
  } catch (err) {
    console.log("ERR_DB_MEDIA: Failed to add a new media! ", err);
  }
}

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

async function downloadFile() {}

export { uploadFileToFirebase, addNewMediatoMongoDB };
