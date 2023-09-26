import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 

export async function GET(request: NextRequest) {
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
  const firestore = getFirestore(app);
  
  const questionsCollectionRef = collection(firestore, "questions");
  const questions = await getDocs(questionsCollectionRef);
  
  if (questions.docs.length == 0) {
    await setDoc(doc(questionsCollectionRef), {
      question: "¿Cómo calificaría la calidad y sabor de las crepas que degustó en nuestra crepería?",
      order: 1,
    });
    await setDoc(doc(questionsCollectionRef), {
      question: "¿Qué opinión le merece el servicio y la amabilidad del personal de \"Fábrica de Crepas\"?",
      order: 2,
    });
    await setDoc(doc(questionsCollectionRef), {
      question: "¿Cómo se sintió con respecto al ambiente y decoración de nuestro local?",
      order: 3,
    });
    await setDoc(doc(questionsCollectionRef), {
      question: "Considerando los precios y la calidad ofrecida, ¿cómo evaluaría la relación calidad-precio en \"Fábrica de Crepas\"?",
      order: 4,
    });
  }
  const questionAsData = (await getDocs(questionsCollectionRef))
    .docs
    .map((questionDoc) => questionDoc.data());

  return NextResponse.json(
    {
      questions: questionAsData,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
