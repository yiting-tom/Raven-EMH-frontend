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

export async function createRobotProfile(profile) {
  const docRef = doc(robotProfilesCollectionRef, profile.name);
  await setDoc(docRef, profile);
}

// Read all documents in a collection, and return an array
export async function getRobotProfiles() {
  const querySnapshot = await getDocs(robotProfilesCollectionRef);
  const results = querySnapshot.docs.map((doc) => doc.data());
  console.log(results);
  return results;
}

// Read a specific document
export async function getSpecificRobotProfile(specificId) {
  const specificRobotProfileRef = doc(robotProfilesCollectionRef, specificId);
  const docSnapshot = await getDoc(specificRobotProfileRef);
  if (docSnapshot.exists()) {
    console.log('Document data:', docSnapshot.data());
  } else {
    console.log('No such document!');
  }
}

export async function updateRobotProfile(specificId, updatedContent) {
  const robotProfileRef = doc(robotProfilesCollectionRef, specificId);
  await updateDoc(robotProfileRef, {
    content: updatedContent,
  });
}

export async function deleteRobotProfile(specificId) {
  const robotProfileRef = doc(robotProfilesCollectionRef, specificId);
  await deleteDoc(robotProfileRef);
}
