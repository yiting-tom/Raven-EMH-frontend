import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
} from 'firebase/firestore';

const db = getFirestore();
const robotProfilesCollectionRef = collection(db, 'robotProfiles');

export async function createRobotProfile(profile, profileId) {
  const docRef = doc(robotProfilesCollectionRef, profileId);
  console.debug('Adding document with ID: ', profile.name);
  await setDoc(docRef, profile);
}

// Read all documents in a collection, and return an object with the document ID as the key
export async function getRobotProfiles() {
  const querySnapshot = await getDocs(robotProfilesCollectionRef);
  const robotProfiles = {};
  querySnapshot.forEach((doc) => {
    robotProfiles[doc.id] = doc.data();
  });
  return robotProfiles;
}

// Read a specific document
export async function getSpecificRobotProfile(specificId) {
  const specificRobotProfileRef = doc(robotProfilesCollectionRef, specificId);
  const docSnapshot = await getDoc(specificRobotProfileRef);
  if (docSnapshot.exists()) {
    console.debug('Document data:', docSnapshot.data());
    return docSnapshot.data();
  } else {
    console.error('No such document!');
  }
}

export async function updateRobotProfile(specificId, updatedContent) {
  const robotProfileRef = doc(robotProfilesCollectionRef, specificId);
  console.debug('Updating document with ID: ', specificId);
  await updateDoc(robotProfileRef, updatedContent);
}

export async function deleteRobotProfile(specificId) {
  const robotProfileRef = doc(robotProfilesCollectionRef, specificId);
  console.debug('Deleting document with ID: ', specificId);
  await deleteDoc(robotProfileRef);
}
