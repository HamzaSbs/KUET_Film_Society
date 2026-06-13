// Join Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('joinForm');
    const submitBtn = document.querySelector('.submit-btn');

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            kuet_mail: document.getElementById('kuet_mail').value.trim(),
            kuet_roll: document.getElementById('kuet_roll').value.trim(),
            batch: document.getElementById('batch').value.trim(),
            mobile: document.getElementById('mobile').value.trim()
        };

        // Validate form data
        if (!validateForm(formData)) {
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'SUBMITTING...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form Data:', formData);
            
            // Store in localStorage for demo purposes
            const submissions = JSON.parse(localStorage.getItem('kuetFilmSocietySubmissions')) || [];
            submissions.push({
                ...formData,
                timestamp: new Date().toLocaleString()
            });
            localStorage.setItem('kuetFilmSocietySubmissions', JSON.stringify(submissions));

            // Show success message
            showSuccessMessage();

            // Reset form
            form.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'SUBMIT';
        }, 1500);
    });

    // Form validation
    function validateForm(data) {
        // Name validation
        if (!data.name || data.name.length < 2) {
            showErrorMessage('Please enter a valid full name');
            return false;
        }

        // KUET Mail validation
        const kuetMailRegex = /^[a-zA-Z0-9._%+-]+@kuet\.ac\.bd$/;
        if (!kuetMailRegex.test(data.kuet_mail)) {
            showErrorMessage('Please enter a valid KUET email (e.g., name@kuet.ac.bd)');
            return false;
        }

        // KUET Roll validation
        if (!data.kuet_roll || data.kuet_roll.length < 2) {
            showErrorMessage('Please enter a valid KUET roll number');
            return false;
        }

        // Batch validation
        const currentYear = new Date().getFullYear();
        const batchYear = parseInt(data.batch);
        if (isNaN(batchYear) || batchYear < 2000 || batchYear > currentYear + 5) {
            showErrorMessage('Please enter a valid batch year');
            return false;
        }

        // Mobile validation
        const mobileRegex = /^[\d\-\+\(\)\s]{10,}$/;
        if (!mobileRegex.test(data.mobile)) {
            showErrorMessage('Please enter a valid mobile number');
            return false;
        }

        return true;
    }

    // Show success message
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'success-message';
        message.textContent = '✓ Successfully joined KUET Film Society!';
        document.body.appendChild(message);

        // Add animation
        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Show error message
    function showErrorMessage(errorText) {
        const message = document.createElement('div');
        message.className = 'error-message';
        message.textContent = '✗ ' + errorText;
        document.body.appendChild(message);

        // Add animation
        setTimeout(() => {
            message.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Real-time email validation
    const emailInput = document.getElementById('kuet_mail');
    emailInput.addEventListener('blur', function() {
        const kuetMailRegex = /^[a-zA-Z0-9._%+-]+@kuet\.ac\.bd$/;
        if (this.value && !kuetMailRegex.test(this.value)) {
            this.style.borderColor = '#d31010';
            this.title = 'Please use your KUET email address (format: name@kuet.ac.bd)';
        } else if (this.value) {
            this.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            this.title = '';
        }
    });

    // Real-time batch year validation
    const batchInput = document.getElementById('batch');
    batchInput.addEventListener('blur', function() {
        const currentYear = new Date().getFullYear();
        const year = parseInt(this.value);
        if (this.value && (isNaN(year) || year < 2000 || year > currentYear + 5)) {
            this.style.borderColor = '#d31010';
            this.title = 'Please enter a valid batch year';
        } else if (this.value) {
            this.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            this.title = '';
        }
    });
});

// Notification styles
const style = document.createElement('style');
style.textContent = `
    .success-message,
    .error-message {
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 18px 25px;
        border-radius: 8px;
        font-weight: 700;
        font-size: 1rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        max-width: 300px;
        text-align: center;
    }

    .success-message {
        background: linear-gradient(to bottom, #4CAF50, #45a049);
        color: white;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
    }

    .error-message {
        background: linear-gradient(to bottom, #d31010, #9b0000);
        color: white;
        box-shadow: 0 4px 12px rgba(211, 16, 16, 0.4);
    }

    .success-message.show,
    .error-message.show {
        opacity: 1;
    }

    @media (max-width: 480px) {
        .success-message,
        .error-message {
            top: 15px;
            right: 15px;
            left: 15px;
            max-width: 100%;
            font-size: 0.95rem;
            padding: 15px 20px;
        }
    }
`;
document.head.appendChild(style);
