import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

export async function POST(req) {
    const items = await req.json();
    const ids = items.map(item => item.id);
    const quantityMap = items.reduce((mapObject, currentItem) => {
        mapObject[currentItem.id] = currentItem.quantity;
        return mapObject;
    }, {})
    // fetch flower from bdd to compute payment ammount
    const flowers = await prisma.flower.findMany({
        where: {
            id: {
                in: ids,
            }
        }
    });
    let totalAmount = 0;
    flowers.forEach(flower => {
        const quantity = Number(quantityMap[flower.id]);
        totalAmount += quantity * flower.price;
    })
    const payementIntent = await stripe.paymentIntents.create({
        amount: totalAmount,
        currency: "eur",
        automatic_payment_methods: {
            enabled: true,
        }
    });
    return NextResponse.json({
        clientSecret:  payementIntent.client_secret,
        amount: totalAmount
    });
}