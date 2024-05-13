import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req, {params}) {
  let options = {
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
  console.log(flowers);
  return NextResponse.json(flowers);
}
export async function POST(req, {params}) {
    const {ids} = await req.json();
    const options = {
        where: {
            id: {
                in: ids
            }
        }
    }
  const flowers = await prisma.flower.findMany(options);
  return NextResponse.json(flowers);
}