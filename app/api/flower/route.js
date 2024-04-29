import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function GET(req, {params}) {
  const flowers = await prisma.flower.findMany();
  return NextResponse.json(flowers);
}