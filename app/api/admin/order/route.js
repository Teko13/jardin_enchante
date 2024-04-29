import { isAdmin } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req, {params}) {
    if(!isAdmin(req)) {
        return new NextResponse(null, {status: 403})
    }
    const userOrders = await prisma.user.findMany({
        where: {
            orders: {
                some: {}
            }
        },
        include: {
            orders: true
        }
    });
    let ordersDetail = [];
    for(const userDetail of userOrders) {
        for(const order of userDetail.orders) {
            const details = await prisma.orderDetail.findMany({
                where: {
                    orderId: order.id,
                }
            });
            ordersDetail.push(details)
        }
    };
    return NextResponse.json(ordersDetail);
}