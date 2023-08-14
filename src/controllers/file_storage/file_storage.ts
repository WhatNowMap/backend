import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase";

async function uploadFileToFirebase(file: File, userId, mediaId) {
  const destinationPath = `${userId}/${mediaId}/${file.name}`;

  // Create a root reference
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  // Create a reference to file
  const storageRef = ref(storage, destinationPath);

  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("SUCCESS_UPLOAD: Uploaded a blob or file!");
  });
}