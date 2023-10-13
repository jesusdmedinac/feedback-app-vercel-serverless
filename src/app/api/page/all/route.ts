import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { doc, setDoc, getDocs } from "firebase/firestore"; 
import { getPagesRef } from '@/app/data/feedback.remote.datasource';
import pagesArray from '@/app/data/pages.json';

export async function GET(request: NextRequest) {
  const pagesRef = await getPagesRef();
  const pagesDocs = (await getDocs(pagesRef)).docs;
  
  if (pagesDocs.length == 0) {
    pagesArray.forEach(async (page) => {
      await setDoc(doc(pagesRef), page);
    });
  }
  const pageAsData = (await getDocs(pagesRef))
    .docs
    .map((pageDoc) => pageDoc.data());

  return NextResponse.json(
    {
      pages: pageAsData,
    },
    {
      status: 200,
    },
  );
};
