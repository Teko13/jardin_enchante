import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req, {params}) {
  const options = {
        include: {
            like: true
        },
        orderBy: {
            created_at: "desc"
        },
  }
  const limit = Number(req.nextUrl.searchParams.get('limit'));
  if(limit > 0) {
    options.take = limit
  } 
  const flowers = await prisma.flower.findMany(options);
  return NextResponse.json(flowers);
}