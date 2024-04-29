import { isAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// add or remove to favorite (like/dislike)
export async function GET(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const flowerId = Number(params.id)
    const userDetail = await prisma.user.findUnique({
        where: {
            id: user.userId
        },
        include: {
            like: true
        }
    });
    // check if flower is in user's favorite list
    const isLiked = userDetail.like.some((likeItem) => (likeItem.flowerId === flowerId));
    // if true remove like
    if(isLiked) {
        await prisma.like.deleteMany({
            where: {
                userId: userDetail.id,
                flowerId
            }
        });
        const flower = await prisma.flower.findUnique({
            where: {
                id: flowerId
            },
            include: {
                like: true
            }
        });
        return NextResponse.json(flower.like);
    }
    // else add like
    else {
        await prisma.like.create({
            data: {
                userId: userDetail.id,
                flowerId
            }
        });
        const flower = await prisma.flower.findUnique({
            where: {
                id: flowerId
            },
            include: {
                like: true
            }
        });
        return NextResponse.json(flower.like);
    }
}