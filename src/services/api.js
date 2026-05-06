const BASE_URL = 'http://localhost:8000';

export async function extractFactSheet(file) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${BASE_URL}/extract-factsheet`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Extraction failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    throw new Error('Could not connect to server. Make sure the backend is running.');
  }
}

export async function generateReport(profileData, factSheetText) {
  try {
    const response = await fetch(`${BASE_URL}/generate-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        profile: profileData,
        fact_sheet_text: factSheetText
      }),
    });
    
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to generate report');
    }
    
    return await response.json();
  } catch (error) {
    throw new Error(error.message || 'Could not connect to server.');
  }
}
