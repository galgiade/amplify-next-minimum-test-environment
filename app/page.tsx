import { secret } from "@aws-amplify/backend";

const stripeKey = secret('STRIPE_SECRET_KEY');

export default function App() {
  // コンソールでデバッグ
  console.log('stripeKey:', stripeKey);
  console.log('stripeKey type:', typeof stripeKey);
  console.log('stripeKey keys:', Object.keys(stripeKey));
  console.log('stripeKey toString():', stripeKey.toString());
  
  return (
    <div>
      <h1>Local Stripe Secret Key</h1>
      <h1>{'Not set'}</h1>
      <h1>Cloud Stripe Secret Key</h1>
      <h1>{stripeKey.toString()}</h1>
      <h1>{JSON.stringify(stripeKey)}</h1>
      <h1>Type: {typeof stripeKey}</h1>
      <h1>Keys: {Object.keys(stripeKey).join(', ')}</h1>
    </div>
  );
}
