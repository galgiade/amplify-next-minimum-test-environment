import { secret } from "@aws-amplify/backend";
import { connection } from "next/server";

export default async function App() {
  await connection()
  
  // ローカル環境変数
  const localStripeKey = process.env.STRIPE_SECRET_KEY;
  
  // Amplifyシークレット
  let amplifySecret = 'Not available';
  try {
    const secretValue = await secret('STRIPE_SECRET_KEY');
    amplifySecret = secretValue.toString();
  } catch (error) {
    console.error('Error getting secret:', error);
  }
  
  return (
    <div>
      <h1>Local Stripe Secret Key</h1>
      <h1>{localStripeKey || 'Not set'}</h1>
      <h1>Amplify Secret Key</h1>
      <h1>{amplifySecret}</h1>
    </div>
  );
}