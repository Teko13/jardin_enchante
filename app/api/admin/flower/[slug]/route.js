import { isAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
    if(!isAdmin(req)) {
        return new NextResponse(null, {status: 403});
    }
    const slug = params.slug;
    const deletedFlower = await prisma.flower.delete({
        where: {
            slug
        }
    });
    return NextResponse.json(deletedFlower);
}

export async function PUT(req, { params }) {
    if(!isAdmin(req)) {
        return new NextResponse(null, {status: 403});
    }
    const slug = params.slug;
    let data = await req.json();
    if (data.name) {
        data = {
            ...data,
            slug: data.name.replace(/\s+/g, "-"),
        };
    }
    const updatedFlower = await prisma.flower.update({
        where: {
            slug
        },
        data
    });
    return NextResponse.json(updatedFlower);
}
