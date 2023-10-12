import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore, CollectionReference } from "firebase/firestore";
import { collection } from "firebase/firestore"; 

const initFeedbackRemoteDataSource = (): Firestore => {
  const firebaseConfig = {
    apiKey: "AIzaSyA-Tn8YHx3R9CZ9ct25DHnqiBTvv-2DmfE",
    authDomain: "fabricadecrepas-8d95a.firebaseapp.com",
    projectId: "fabricadecrepas-8d95a",
    storageBucket: "fabricadecrepas-8d95a.appspot.com",
    messagingSenderId: "392610741813",
    appId: "1:392610741813:web:3f1deaba47d1ed46753b7c",
    measurementId: "G-1HXLXF8WNG"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
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