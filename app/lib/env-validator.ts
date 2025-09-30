'use server';

export async function validateEnvironmentVariables() {
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] === Environment Variables Validation ===`);
  
  const allEnvVars = Object.keys(process.env);
  const stripeVars = allEnvVars.filter(key => key.toUpperCase().includes('STRIPE'));
  const secretVars = allEnvVars.filter(key => key.toUpperCase().includes('SECRET'));
  
  console.log(`[${timestamp}] Total environment variables:`, allEnvVars.length);
  console.log(`[${timestamp}] STRIPE variables:`, stripeVars);
  console.log(`[${timestamp}] SECRET variables:`, secretVars);
  
  const validation = {
    timestamp,
    totalEnvVars: allEnvVars.length,
    stripeVars,
    secretVars,
    stripeSecretKeyExists: !!process.env.STRIPE_SECRET_KEY,
    stripeSecretKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    allEnvVarNames: allEnvVars.slice(0, 20), // 最初の20個の環境変数名
    isValid: !!process.env.STRIPE_SECRET_KEY
  };
  
  console.log(`[${timestamp}] Validation result:`, validation);
  console.log(`[${timestamp}] === End Environment Variables Validation ===`);
  
  return validation;
}
