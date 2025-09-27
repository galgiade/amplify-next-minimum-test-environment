import { connection } from "next/server";

export default async function App() {
  await connection() // ランタイム環境変数を有効化
  // 直接ランタイムで環境変数を取得
  const localStripeKey = process.env.STRIPE_SECRET_KEY;
  console.log("localStripeKey", localStripeKey);
  return (
    <div>
      <h1>Local Stripe Secret Key</h1>
        <h1>{localStripeKey || 'Not set'}</h1>
    </div>
  );
}