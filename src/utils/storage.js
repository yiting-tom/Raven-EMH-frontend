import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const storage = getStorage(); // Initialize Firebase Storage

export async function uploadImage(imageFile, imageName, setProgress) {
  const storageRef = ref(storage, 'images/' + imageName);
  const uploadTask = uploadBytesResumable(storageRef, imageFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Calculate the progress as a percentage
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        // Call the onProgress callback if provided
        setProgress && setProgress(progress);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      },
    );
  });
}
