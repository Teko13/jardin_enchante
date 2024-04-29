import { PrismaClient } from "@prisma/client";
import { isAuth } from "@/lib/auth";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const newOrder = await prisma.order.create({
        data: {userId: user.userId}
    });
    const {orderItems} = await req.json();
    orderItems.forEach(async (flower) => {
        await prisma.orderDetail.create({
            data: {
                orderId: newOrder.id,
                flowerId: flower.flowerId,
                quantity: flower.quantity
            }
        })
    });
    return NextResponse.json(newOrder)
}
export async function GET(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const userDetails = await prisma.user.findUnique({
        where: {
            id: user.userId
        },
        include: {
            orders: true
        }
    });
    let ordersDetail = [];
    for(const order of userDetails.orders) {
        const details = await prisma.orderDetail.findMany({
            where: {
                orderId: order.id,
            }
        });
         ordersDetail.push(details);
    };
    return NextResponse.json(ordersDetail);
}