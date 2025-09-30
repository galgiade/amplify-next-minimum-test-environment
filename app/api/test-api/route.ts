import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] === Test API Environment Variables Debug ===`);
  console.log(`[${timestamp}] NODE_ENV:`, process.env.NODE_ENV);
  console.log(`[${timestamp}] STRIPE_SECRET_KEY exists:`, !!process.env.STRIPE_SECRET_KEY);
  console.log(`[${timestamp}] STRIPE_SECRET_KEY length:`, process.env.STRIPE_SECRET_KEY?.length || 0);
  console.log(`[${timestamp}] All STRIPE env vars:`, Object.keys(process.env).filter(key => key.includes('STRIPE')));
  console.log(`[${timestamp}] All env vars count:`, Object.keys(process.env).length);
  console.log(`[${timestamp}] === End Debug ===`);

  const debugInfo = {
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY_exists: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_length: process.env.STRIPE_SECRET_KEY?.length || 0,
    STRIPE_env_vars: Object.keys(process.env).filter(key => key.includes('STRIPE')),
    total_env_vars: Object.keys(process.env).length,
    all_env_keys: Object.keys(process.env).slice(0, 10), // 最初の10個の環境変数名
    timestamp: timestamp
  };

  return NextResponse.json({
    success: true,
    message: "APIルートが正常に実行されました。コンソールログを確認してください。",
    debug: debugInfo
  });
}

export async function POST(req: NextRequest) {
  console.log('=== Test API POST Environment Variables Debug ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
  console.log('STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY?.length || 0);
  console.log('All STRIPE env vars:', Object.keys(process.env).filter(key => key.includes('STRIPE')));
  console.log('All env vars count:', Object.keys(process.env).length);
  console.log('=== End Debug ===');

  return NextResponse.json({
    success: true,
    method: 'POST',
    debug: {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY_exists: !!process.env.STRIPE_SECRET_KEY,
      STRIPE_SECRET_KEY_length: process.env.STRIPE_SECRET_KEY?.length || 0,
      STRIPE_env_vars: Object.keys(process.env).filter(key => key.includes('STRIPE')),
      total_env_vars: Object.keys(process.env).length,
      all_env_keys: Object.keys(process.env).slice(0, 10) // 最初の10個の環境変数名
    }
  });
}