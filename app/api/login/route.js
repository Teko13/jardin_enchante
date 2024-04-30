import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req, {params}) {
    const {email, password} = await req.json();
    const user = await prisma.user.findUnique({where: {email}, include: {like: true}});
    if(!user || !await bcrypt.compare(password, user.password)) {
        return new NextResponse(null, {status: 401});
    }
    const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
    );
    return NextResponse.json({token, user});
}