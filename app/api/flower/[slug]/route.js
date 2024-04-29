import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, {params}) {
    const slug = params.slug;
    const flower = await prisma.flower.findFirst({
        where: {
            slug
        }
    });
    return NextResponse.json(flower);
}