import { isAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
    if(!isAdmin(req)) {
        return new NextResponse(null, {status: 403});
    }
    const id = Number(params.id);
    const deletedFlower = await prisma.flower.delete({
        where: {
            id
        }
    });
    return NextResponse.json(deletedFlower);
}

export async function PUT(req, { params }) {
    if(!isAdmin(req)) {
        return new NextResponse(null, {status: 403});
    }
    const id = Number(params.id);
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
    const updatedFlower = await prisma.flower.update({
        where: {
            id
        },
        data
    });
    return NextResponse.json(updatedFlower);
}
