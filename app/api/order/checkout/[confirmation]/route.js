import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req, {params}) {
    const amount = 1400;
    const payementIntent = await stripe.paymentIntents.retrieve(params.confirmation);
    if(payementIntent.status === "succeeded") {
        // update order
        return NextResponse.json({status: payementIntent.status});
    }
    return new NextResponse(null, {status: 400});
}