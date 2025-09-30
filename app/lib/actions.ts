'use server';

export async function testPostAction() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] === Server Action POST Debug ===`);
  console.log(`[${timestamp}] Server Action NODE_ENV:`, process.env.NODE_ENV);
  console.log(`[${timestamp}] Server Action STRIPE_SECRET_KEY exists:`, !!process.env.STRIPE_SECRET_KEY);
  console.log(`[${timestamp}] Server Action STRIPE_SECRET_KEY length:`, process.env.STRIPE_SECRET_KEY?.length || 0);
  console.log(`[${timestamp}] Server Action All STRIPE env vars:`, Object.keys(process.env).filter(key => key.includes('STRIPE')));
  console.log(`[${timestamp}] Server Action All env vars count:`, Object.keys(process.env).length);
  
  // 環境変数の詳細デバッグ
  console.log(`[${timestamp}] All environment variables:`, Object.keys(process.env));
  console.log(`[${timestamp}] Environment variables containing 'STRIPE':`, Object.keys(process.env).filter(key => key.toUpperCase().includes('STRIPE')));
  console.log(`[${timestamp}] Environment variables containing 'SECRET':`, Object.keys(process.env).filter(key => key.toUpperCase().includes('SECRET')));
  
  console.log(`[${timestamp}] === End Server Action Debug ===`);

  const debugInfo = {
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY_exists: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_SECRET_KEY_length: process.env.STRIPE_SECRET_KEY?.length || 0,
    STRIPE_env_vars: Object.keys(process.env).filter(key => key.includes('STRIPE')),
    total_env_vars: Object.keys(process.env).length,
    all_env_keys: Object.keys(process.env).slice(0, 10),
    timestamp: timestamp,
    execution_method: 'server_action'
  };

  return {
    success: true,
    message: "サーバーアクションでPOSTが実行されました。",
    debug: debugInfo
  };
}
