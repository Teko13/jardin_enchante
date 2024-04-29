import { isAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req, {params}) {
  if(!isAdmin(req)) {
      return new NextResponse(null, {status: 403});
    }
  let data = await req.json();
  data = {
    ...data,
    slug: data.name.replace(/\s+/g, "-"),
  };
  const flower = await prisma.flower.create({
    data
  });
  return NextResponse.json(flower);
}