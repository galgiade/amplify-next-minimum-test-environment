import TestPresentation from "./TestPresentation";
import { NextRequest } from "next/server";

export default async function TestContainer() {
  // サーバーサイドでGET APIを実行
  let apiResult;
  let error = null;

  // 方法1: 直接APIルートのロジックを実行（推奨）
  try {
    console.log('=== Server-side API Logic Execution ===');
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Server NODE_ENV:`, process.env.NODE_ENV);
    console.log(`[${timestamp}] Server STRIPE_SECRET_KEY exists:`, !!process.env.STRIPE_SECRET_KEY);
    console.log(`[${timestamp}] Server STRIPE_SECRET_KEY length:`, process.env.STRIPE_SECRET_KEY?.length || 0);
    console.log(`[${timestamp}] Server All STRIPE env vars:`, Object.keys(process.env).filter(key => key.includes('STRIPE')));
    console.log(`[${timestamp}] Server All env vars count:`, Object.keys(process.env).length);
    console.log(`[${timestamp}] === End Server Debug ===`);

    const debugInfo = {
      NODE_ENV: process.env.NODE_ENV,
      STRIPE_SECRET_KEY_exists: !!process.env.STRIPE_SECRET_KEY,
      STRIPE_SECRET_KEY_length: process.env.STRIPE_SECRET_KEY?.length || 0,
      STRIPE_env_vars: Object.keys(process.env).filter(key => key.includes('STRIPE')),
      total_env_vars: Object.keys(process.env).length,
      all_env_keys: Object.keys(process.env).slice(0, 10),
      timestamp: timestamp,
      execution_method: 'direct_server_logic'
    };

    apiResult = {
      success: true,
      message: "サーバーサイドで直接実行されました。",
      debug: debugInfo
    };
  } catch (err) {
    console.error('Server direct execution error:', err);
    error = err instanceof Error ? err.message : 'Unknown error';
    apiResult = { error };
  }

  // サーバーサイド環境変数を取得
  const serverEnvVars = {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '***hidden***' : 'undefined',
    NEXT_PUBLIC_STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || 'undefined',
    NODE_ENV: process.env.NODE_ENV || 'undefined'
  };

  return (
    <TestPresentation 
      apiResult={apiResult}
      error={error}
      serverEnvVars={serverEnvVars}
    />
  );
}