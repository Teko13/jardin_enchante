import { isAdmin } from '@/lib/auth';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    if(!isAdmin(request)) {
        return new NextResponse(null, {status: 403});
    }
  const datetime = Math.floor(Date.now() / 1000);
  const file = await request.blob();
  const filename = `${datetime}`;

   const blob = await put(filename, file, {
     access: 'public',
   });
   return NextResponse.json(blob);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
