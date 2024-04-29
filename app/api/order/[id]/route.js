import { isAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const id = Number(params.id);
    const order = await prisma.order.findUnique({
        where: {
            id
        },
        include: {
            orderDetail: true
        }
    });
    if(!order) {
        return NextResponse.json([]);
    }
    if(order.userId !== user.userId) {
        return new NextResponse(null, {status: 401});
    }
    return NextResponse.json(order.orderDetail);
}