export async function testPostApi() {
  try {
    console.log('=== Client-side POST API Call ===');
    const response = await fetch('/api/test-api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Client POST API result:', data);
    return data;
  } catch (error) {
    console.error('Client POST API error:', error);
    return { 
      error: error instanceof Error ? error.message : 'Unknown error',
      success: false 
    };
  }
}
