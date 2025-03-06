// Initialize EmailJS
emailjs.init('CUtjM0OlQaRKuKtgi'); // Replace with your actual public key

function initializeFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const donePop = document.getElementById('done-pop');

    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    // Validate fields
    let isValid = true;
    if (!name) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }
    if (!email) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!validateEmail(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!message) {
      messageError.textContent = 'Please enter a message.';
      isValid = false;
    }

    if (!isValid) return;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Send email
    sendMail(name, email, message, submitButton, donePop);
  });
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function sendMail(name, email, message, submitButton, donePop) {
  const templateParams = {
    from_name: name,
    from_email: email,
    message: message
  };

  console.log('Sending email with params:', templateParams); // Debugging

  emailjs.send('sabirsportfolio', 'template_ea224qe', templateParams, 'CUtjM0OlQaRKuKtgi')
    .then((response) => {
      console.log('Email sent successfully!', response); // Debugging
      document.getElementById('contact-form').reset();
      showDonePop('Message sent successfully!');
    }, (error) => {
      console.error('EmailJS Error:', error); // Debugging
      console.error('Error details:', error.text || error.message); // More details
      showDonePop('FAILED: Please Send your email Direct to sabirhussain0166@gmail.com');
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    });
}

function showDonePop(message) {
  console.log('Showing popup with message:', message); // Debugging
  const donePop = document.getElementById('done-pop');
  const donePopMessage = document.getElementById('done-pop-message');

  donePopMessage.textContent = message;
  donePop.style.display = 'flex';

  setTimeout(() => {
    donePop.style.display = 'none';
  }, 8000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Ensure the popup is hidden on page load
  document.getElementById('done-pop').style.display = 'none';
  initializeFormValidation();
});