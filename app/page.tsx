import { secret } from "@aws-amplify/backend";

async function getStripeKey() {
  "use server";
  try {
    const stripeKey = await secret('STRIPE_SECRET_KEY');
    console.log('Raw stripeKey:', stripeKey);
    console.log('stripeKey type:', typeof stripeKey);
    console.log('stripeKey keys:', Object.keys(stripeKey));
    console.log('Resolved value:', stripeKey.toString());
    return stripeKey.toString();
  } catch (error) {
    console.error('Error getting secret:', error);
    return 'Secret not found or error occurred';
  }
}

export default async function App() {
  const stripeKeyValue = await getStripeKey();
  
  // コンソールでデバッグ
  console.log('Final stripeKeyValue:', stripeKeyValue);
  
  return (
    <div>
      <h1>Local Stripe Secret Key</h1>
      <h1>{process.env.STRIPE_SECRET_KEY || 'Not set'}</h1>
      <h1>Cloud Stripe Secret Key</h1>
      <h1>{stripeKeyValue}</h1>
      <h1>Type: {typeof stripeKeyValue}</h1>
      <h1>Keys: {Object.keys(stripeKeyValue).join(', ')}</h1>
    </div>
  );
}