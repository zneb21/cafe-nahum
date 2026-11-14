document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('form-message');
    const resetBtn = document.getElementById('resetBtn');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        // Clear previous errors and messages
        clearErrors();
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';

        // Validate First Name
        const firstName = document.getElementById('first-name');
        if (!firstName.value.trim()) {
            showError(firstName, 'first-name-error', 'First name is required.');
            isValid = false;
        }

        // Validate Last Name
        const lastName = document.getElementById('last-name');
        if (!lastName.value.trim()) {
            showError(lastName, 'last-name-error', 'Last name is required.');
            isValid = false;
        }

        // Validate Email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'email-error', 'Email address is required.');
            isValid = false;
        } else if (!emailRegex.test(email.value.trim())) {
            showError(email, 'email-error', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate Phone (optional, but if provided, validate format)
        const phone = document.getElementById('phone');
        if (phone.value.trim() && !/^[\d\+\-\s\(\)]{7,15}$/.test(phone.value.trim())) {
            showError(phone, 'phone-error', 'Please enter a valid phone number.');
            isValid = false;
        }

        // Validate Inquiry Type
        const inquiryType = document.getElementById('inquiry-type');
        if (!inquiryType.value) {
            showError(inquiryType, 'inquiry-type-error', 'Please select an inquiry type.');
            isValid = false;
        }

        // Validate Message
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError(message, 'message-error', 'Message cannot be empty.');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'message-error', 'Message must be at least 10 characters long.');
            isValid = false;
        }

        if (isValid) {
            formMessage.textContent = 'Thank you! Your message has been successfully validated. (Demonstration only — no message sent).';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            form.reset();
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            formMessage.textContent = 'Please correct the highlighted errors above and try again.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
        }
    });

    resetBtn.addEventListener('click', function () {
        clearErrors();
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
    });

    function showError(inputElement, errorId, message) {
        inputElement.classList.add('input-error');
        const errorSpan = document.getElementById(errorId);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.display = 'block';
        }
    }

    function clearErrors() {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => input.classList.remove('input-error'));
        const errorSpans = form.querySelectorAll('.error-msg');
        errorSpans.forEach(span => {
            span.textContent = '';
            span.style.display = 'none';
        });
    }
});