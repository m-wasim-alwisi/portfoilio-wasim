// scripts/debug-csrf.ts
import { cookies } from 'next/headers';
import { generateCSRFToken, validateCSRFToken } from '../lib/csrf';

async function debugCSRF() {
  console.log('🔍 Debugging CSRF Token...\n');

  try {
    // Generate token
    const token = await generateCSRFToken();
    console.log('✅ Generated token:', token);

    // Validate token
    const isValid = await validateCSRFToken(token);
    console.log('✅ Token valid:', isValid);

    // Get token from cookie
    const cookieStore = await cookies();
    const storedToken = cookieStore.get('csrf_token')?.value;
    console.log('✅ Stored token:', storedToken);

    // Compare
    console.log('✅ Tokens match:', token === storedToken);

    process.exit(0);
  } catch (error) {
    console.error('❌ Debug failed:', error);
    process.exit(1);
  }
}

debugCSRF();