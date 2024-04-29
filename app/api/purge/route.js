import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
export async function GET(req, {params}) {
    const deletelike = await prisma.like.deleteMany();
    const deleteOrderdetail = await prisma.orderDetail.deleteMany();
    const deleteorder = await prisma.order.deleteMany();
    const deleteUser = await prisma.user.deleteMany();
    const deleteFlower = await prisma.flower.deleteMany();
    const removeAll = [deleteFlower, deleteUser, deleteorder, deleteOrderdetail, deletelike];
    return NextResponse.json(removeAll);
}