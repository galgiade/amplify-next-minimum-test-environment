export default async function App() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  
  return (
    <div>
      <h1>hosting Stripe Secret Key</h1>
      <h1>{stripeKey}</h1>
    </div>
  );
}