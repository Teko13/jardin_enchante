import { isAuth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function DELETE(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
  const deletedUser = await prisma.user.delete({
    where: {
        id: user.userId
    }
  });
  return NextResponse.json(deletedUser);
}

export async function GET(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const id = user.userId;
    const userDetail = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            like: {
                include: {
                    flower: {
                        include: {
                            like: true
                        }
                    }
                }
            }
        }
    });
    return NextResponse.json(userDetail);
}

export async function PUT(req, {params}) {
    const user = isAuth(req);
    if(!user) {
        return new NextResponse(null, {status: 401});
    }
    const id = user.userId; 
    const data = await req.json();
    // check and delete if isset 'role' key
    if("role" in data) {
        return new NextResponse(null, {status: 403});
    }
    const UpdateUser = await prisma.user.update({
        where: {
            id
        },
        data
    });
    return NextResponse.json(UpdateUser);
}