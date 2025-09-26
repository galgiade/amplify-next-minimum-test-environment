"use server";
import { secret } from "@aws-amplify/backend";

export async function GET() {
  const stripeKey = await secret('STRIPE_SECRET_KEY');
  
  return Response.json({ 
    key: stripeKey.toString() 
  });
}