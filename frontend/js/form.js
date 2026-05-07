let formState = {};
let selectedFile = null;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('profileForm');
    if(!form) return;

    // Navigation logic
    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentStepId = e.target.closest('.step').id;
            if(!validateStep(currentStepId)) {
                alert('Please fill all required fields correctly.');
                return;
            }
            document.getElementById(currentStepId).classList.remove('active');
            document.getElementById(e.target.dataset.next).classList.add('active');
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentStepId = e.target.closest('.step').id;
            document.getElementById(currentStepId).classList.remove('active');
            document.getElementById(e.target.dataset.prev).classList.add('active');
        });
    });

    // Form submit
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if(!validateStep('step4')) return;
        
        // Gather data
        formState = {
            name: document.getElementById('name').value,
            age: parseInt(document.getElementById('age').value),
            occupation: document.getElementById('occupation').value,
            monthly_income: parseFloat(document.getElementById('monthly_income').value),
            current_savings: parseFloat(document.getElementById('current_savings').value),
            goals: document.getElementById('goals').value.split(',').map(s=>s.trim()),
            time_horizon_years: parseInt(document.getElementById('time_horizon_years').value),
            target_corpus: parseFloat(document.getElementById('target_corpus').value),
            risk_appetite: document.getElementById('risk_appetite').value,
            drop_reaction: document.getElementById('drop_reaction').value
        };

        sessionStorage.setItem('finSight_profile', JSON.stringify(formState));
        
        // File handling
        const fileInput = document.getElementById('factsheet');
        const file = fileInput.files[0] || selectedFile;
        
        // Show loading UI inline
        document.body.innerHTML = `
        <div class="container loading-container">
            <div class="spinner"></div>
            <h2>Synthesizing Financial Intelligence</h2>
            <p>Analyzing profile, extracting fact sheet data, and consulting the Gemini model...</p>
        </div>`;
        
        try {
            const report = await generateReport(formState, file);
            sessionStorage.setItem('finSight_report', JSON.stringify(report));
            window.location.href = 'report.html';
        } catch(err) {
            alert('Error: ' + err.message);
            window.location.reload();
        }
    });
});

function validateStep(stepId) {
    const step = document.getElementById(stepId);
    const inputs = step.querySelectorAll('input[required], select[required]');
    for(let input of inputs) {
        if(!input.checkValidity()) return false;
    }
    return true;
}
