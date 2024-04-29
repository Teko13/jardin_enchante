import { isAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const userDetail = await prisma.user.findUnique({
        where: {
            id: user.userId
        },
        include: {
            like: true
        }
    });
    const favoriteFlowers = [];
    for(const like of userDetail.like) {
        const flowerDetail = await prisma.flower.findUnique({
            where: {
                id: like.flowerId
            },
            include: {
                like: true
            }
        });
        favoriteFlowers.push(flowerDetail);
    };
    return NextResponse.json(favoriteFlowers);
}
