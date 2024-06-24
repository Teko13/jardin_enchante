import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req, {params}){
    const submitData = await req.json();
    // rewrite data for more security
    const data = {
        first_name: submitData.first_name,
        last_name: submitData.last_name,
        email: submitData.email,
        password: submitData.password,
    }
    const checkUserEmptyTable = await prisma.user.findFirst();
    if(!checkUserEmptyTable) {
        data.role = "admin";
    }
    const hashPassword = await bcrypt.hash(data.password, 10);
    data.password = hashPassword;
    const newUser = await prisma.user.create({
        data
    });
    return NextResponse.json(newUser);
}