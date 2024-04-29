import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
export function isAuth(req) {
    try {
        const token = req.headers.get("authorization").split(" ")[1];
        const verif = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verif);
        return verif;
    } catch (error) {
        return false;
    }
}
export async function isAdmin(req) {
    const user = isAuth(req);
    if(!user) {
        return false;
    }
    const prisma = new PrismaClient();
    const userDetail = await prisma.user.findUnique({
        where: {
            id: user.userId
        }
    });
    if(userDetail.role === "admin") {
        return user;
    }
    return false
}