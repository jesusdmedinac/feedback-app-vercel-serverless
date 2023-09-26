import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, doc, setDoc, getDocs } from "firebase/firestore"; 

export async function POST(request: NextRequest) {
  request.headers.set('Access-Control-Allow-Credentials', 'true');
  request.headers.set('Access-Control-Allow-Origin', '*');
  request.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  request.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

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
  
  const answersCollectionRef = collection(firestore, "answers");
  const answer = await request.json();
  await setDoc(doc(answersCollectionRef), answer);

  return NextResponse.json(
    {
      answer: answer,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    },
  );
}
