import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

const storage = getStorage(); // Initialize Firebase Storage

export async function uploadImage(
  imageFile,
  folderName,
  imageName,
  setProgress,
) {
  const storageRef = ref(storage, `images/${folderName}/${imageName}`);
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

export async function deleteImage(folderName, imageName) {
  const storage = getStorage();
  const imageRef = ref(storage, `images/${folderName}${imageName}`);

  return deleteObject(imageRef)
    .then(() => {
      console.log('Image deleted successfully!');
      return true;
    })
    .catch((error) => {
      console.error('Error deleting image: ', error);
      return false;
    });
}
