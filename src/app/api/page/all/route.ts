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
  
  const pagesCollectionRef = collection(firestore, "pages");
  const pages = await getDocs(pagesCollectionRef);
  
  if (pages.docs.length == 0) {
    await setDoc(doc(pagesCollectionRef), {
      text: "¿Cómo calificaría la calidad y sabor de las crepas que degustó en nuestra crepería?",
      order: 1,
      image: "1-question-image.png",
      type: "QUESTION"
    });
    await setDoc(doc(pagesCollectionRef), {
      text: "¿Qué opinión le merece el servicio y la amabilidad del personal de Fábrica de Crepas?",
      order: 2,
      image: "2-question-image.png",
      type: "QUESTION"
    });
    await setDoc(doc(pagesCollectionRef), {
      text: "¿Cómo se sintió con respecto al ambiente y decoración de nuestro local?",
      order: 3,
      image: "3-question-image.png",
      type: "QUESTION"
    });
    await setDoc(doc(pagesCollectionRef), {
      text: "Considerando los precios y la calidad ofrecida, ¿cómo evaluaría la relación calidad-precio en Fábrica de Crepas?",
      order: 4,
      image: "4-question-image.png",
      type: "QUESTION"
    });
    await setDoc(doc(pagesCollectionRef), {
      text: "¡Gracias por sus comentario!",
      order: 5,
      image: "",
      type: "MESSAGE"
    });
  }
  const pageAsData = (await getDocs(pagesCollectionRef))
    .docs
    .map((pageDoc) => pageDoc.data());

  return NextResponse.json(
    {
      pages: pageAsData,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
