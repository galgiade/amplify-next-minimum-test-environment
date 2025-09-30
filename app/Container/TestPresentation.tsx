"use client";

import { useState } from "react";

interface TestPresentationProps {
  apiResult: any;
  error: string | null;
  serverEnvVars?: {
    STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_STRIPE_SECRET_KEY: string;
    NODE_ENV: string;
  };
}

export default function TestPresentation({ 
  apiResult, 
  error,
  serverEnvVars
}: TestPresentationProps) {
  const [postResult, setPostResult] = useState<any>(null);
  const [postLoading, setPostLoading] = useState(false);

  const testPostApi = async () => {
    setPostLoading(true);
    try {
      const response = await fetch('/api/test-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setPostResult(data);
    } catch (error) {
        setPostResult({ error: error instanceof Error ? error.message : 'Unknown error' });
      } finally {
      setPostLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Environment Variables Test</h1>
      
      {/* クライアントサイド環境変数表示 */}
      <div className="mb-8 p-4 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Client Side Environment Variables</h2>
        <div className="space-y-2">
          <p><strong>NEXT_PUBLIC_STRIPE_SECRET_KEY:</strong> {process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY || 'undefined'}</p>
          <p><strong>NODE_ENV:</strong> {process.env.NODE_ENV || 'undefined'}</p>
          <p className="text-sm text-gray-600">
            <strong>Note:</strong> STRIPE_SECRET_KEY is not available on client-side for security reasons.
            Only NEXT_PUBLIC_ prefixed variables are accessible in the browser.
          </p>
        </div>
      </div>

      {/* サーバーサイド環境変数表示 */}
      {serverEnvVars && (
        <div className="mb-8 p-4 border rounded-lg bg-yellow-50">
          <h2 className="text-xl font-semibold mb-4">Server Side Environment Variables</h2>
          <div className="space-y-2">
            <p><strong>STRIPE_SECRET_KEY:</strong> {serverEnvVars.STRIPE_SECRET_KEY}</p>
            <p><strong>NEXT_PUBLIC_STRIPE_SECRET_KEY:</strong> {serverEnvVars.NEXT_PUBLIC_STRIPE_SECRET_KEY}</p>
            <p><strong>NODE_ENV:</strong> {serverEnvVars.NODE_ENV}</p>
          </div>
        </div>
      )}

      {/* GET API結果表示（サーバーサイド実行） */}
      <div className="mb-8 p-4 border rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">GET API Result (Server-side executed)</h2>
        {error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(apiResult, null, 2)}
          </pre>
        )}
      </div>

      {/* POST APIテストボタン */}
      <div className="mb-8 p-4 border rounded-lg bg-green-50">
        <h2 className="text-xl font-semibold mb-4">POST API Test</h2>
        <button
          onClick={testPostApi}
          disabled={postLoading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {postLoading ? 'Loading...' : 'Test POST API'}
        </button>
        
        {postResult && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">POST API Response</h3>
            <pre className="bg-gray-100 p-4 rounded overflow-auto">
              {JSON.stringify(postResult, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}