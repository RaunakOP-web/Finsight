document.addEventListener('DOMContentLoaded', () => {
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('factsheet');
    const fileError = document.getElementById('file-error');
    if(!uploadZone || !fileInput) return;

    uploadZone.addEventListener('click', () => fileInput.click());

    uploadZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadZone.classList.add('dragover');
    });

    uploadZone.addEventListener('dragleave', () => {
        uploadZone.classList.remove('dragover');
    });

    uploadZone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFile(fileInput.files[0]);
        }
    });

    function handleFile(file) {
        const ext = file.name.split('.').pop().toLowerCase();
        const allowed = ['pdf', 'png', 'jpg', 'jpeg'];
        
        if (!allowed.includes(ext)) {
            fileError.textContent = "Invalid file type. Only PDF, PNG, JPG, JPEG allowed.";
            selectedFile = null;
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) {
            fileError.textContent = "File too large (Max 10MB).";
            selectedFile = null;
            return;
        }

        fileError.textContent = "";
        uploadZone.querySelector('p').textContent = `Selected: ${file.name}`;
        selectedFile = file; // defined in form.js
    }
});
