import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { doc, setDoc } from "firebase/firestore"; 
import { getAnswersRef } from '@/app/data/feedback.remote.datasource';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const answerAsString = searchParams.get("answer") || "{}";
  const answer = JSON.parse(answerAsString);
  const answersRef = await getAnswersRef(true);
  await setDoc(doc(answersRef), answer);

  return NextResponse.json(
    {
      answer: answer,
    },
    {
      status: 200,
    },
  );
};
