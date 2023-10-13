import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, CollectionReference } from "firebase/firestore";
import { collection } from "firebase/firestore"; 

const initFeedbackRemoteDataSource = (): Firestore => {
  const firebaseConfig = process.env.FIREBASE_CONFIG || "";
  const firebaseConfigAsString = Buffer.from(firebaseConfig, "base64").toString();
  const firebaseConfigAsJSON = JSON.parse(firebaseConfigAsString);  
  const app = initializeApp(firebaseConfigAsJSON);
  return getFirestore(app);
};

export const getPagesRef = async (isDevMode = false): Promise<CollectionReference> => {
  const firestore = initFeedbackRemoteDataSource();
  const collectionName = isDevMode ? "pages-dev" : "pages";
  return collection(firestore, collectionName);
}

export const getAnswersRef = async (isDevMode = false): Promise<CollectionReference> => {
  const firestore = initFeedbackRemoteDataSource();
  const collectionName = isDevMode ? "answers-dev" : "answers";
  return collection(firestore, collectionName);
}