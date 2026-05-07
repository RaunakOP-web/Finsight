const API_BASE = 'http://localhost:8000';

async function extractFactSheet(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    try {
        const response = await fetch(`${API_BASE}/extract-factsheet`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to extract file.');
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        throw new Error(e.message || 'Network error during extraction.');
    }
}

async function generateReport(profileData, file) {
    const formData = new FormData();
    formData.append('profile_data', JSON.stringify(profileData));
    if (file) {
        formData.append('fact_sheet', file);
    }
    
    try {
        const response = await fetch(`${API_BASE}/generate-report`, {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.detail || 'Failed to generate report.');
        }
        return await response.json();
    } catch (e) {
        console.error(e);
        throw new Error('Our AI brain is currently experiencing issues. Please try again later.');
    }
}
