import { isAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
  if(!isAdmin(req)) {
      return new NextResponse(null, {status: 403});
  }
  let data = await req.json();
  if (data.name) {
    data = {
      ...data,
      slug: data.name.replace(/\s+/g, "-"),
    };
    data.price = Number(data.price) * 100;
  }
  else {
    return new NextResponse(null, {status: 400});
  }
  const flower = await prisma.flower.create({
    data
  })
  return NextResponse.json(flower);
}