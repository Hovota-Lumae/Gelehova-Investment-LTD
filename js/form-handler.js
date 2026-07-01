// Contact Form Handler - Submits to Google Apps Script
// Replace YOUR_GOOGLE_APPS_SCRIPT_URL with your deployed Apps Script URL

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyMi6vJz6fHiADVSCI4barap-nVegQuJDxJyBuOYcLEEXk3SqS9fVwCsuwdgnrMwwsE/exec"; // You'll replace this with your actual URL after deployment

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
});

async function handleFormSubmit(e) {
  e.preventDefault();

  // Check if Apps Script URL is configured
  if (!GOOGLE_APPS_SCRIPT_URL) {
    showError(
      "Form is not yet configured. Please contact administrator to set up Google Apps Script integration."
    );
    return;
  }

  const form = e.target;
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Disable button and show loading state
  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";

  try {
    // Collect form data
    const data = {
      firstName: formData.get("first-name") || formData.get("fullName") || "",
      lastName: formData.get("last-name") || "",
      email: formData.get("email") || "",
      phone: formData.get("phone") || "",
      company: formData.get("company") || "",
      projectType: formData.get("project-type") || formData.get("projectType") || "",
      message: formData.get("message") || "",
      newsletter: formData.get("newsletter") ? "Yes" : "No",
      timestamp: new Date().toLocaleString(),
    };

    // Submit via standard form POST to avoid CORS issues with Apps Script.
    // Create a hidden iframe target so the page does not navigate away.
    let iframe = document.getElementById("form-target-iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.name = "form-target-iframe";
      iframe.id = "form-target-iframe";
      document.body.appendChild(iframe);
    }

    // Configure form to post to Apps Script URL
    form.target = "form-target-iframe";
    form.action = GOOGLE_APPS_SCRIPT_URL;
    form.method = "POST";

    // Submit the form (this sends urlencoded/form-data to Apps Script)
    form.submit();

    // Show success message immediately (Apps Script will receive the data).
    showSuccess(
      "Thank you! Your message has been sent successfully. We'll get back to you within 24 hours."
    );

    // Reset form
    form.reset();
  } catch (error) {
    console.error("Error submitting form:", error);
    showError(
      "There was an error sending your message. Please try again or contact us directly."
    );
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
}

function showSuccess(message) {
  const form = document.getElementById("contactForm");
  let successDiv = form.querySelector(".success-message");

  if (!successDiv) {
    successDiv = document.createElement("div");
    successDiv.className =
      "success-message bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 p-4 rounded-lg mb-6 flex items-start gap-3";
    form.insertBefore(successDiv, form.firstChild);
  }

  successDiv.innerHTML = `
    <span class="text-primary mt-0.5 text-xl">✓</span>
    <div>
      <h3 class="font-bold">Success!</h3>
      <p>${message}</p>
    </div>
  `;
  successDiv.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    successDiv.style.display = "none";
  }, 5000);
}

function showError(message) {
  const form = document.getElementById("contactForm");
  let errorDiv = form.querySelector(".error-message");

  if (!errorDiv) {
    errorDiv = document.createElement("div");
    errorDiv.className =
      "error-message bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 p-4 rounded-lg mb-6 flex items-start gap-3";
    form.insertBefore(errorDiv, form.firstChild);
  }

  errorDiv.innerHTML = `
    <span class="text-red-600 dark:text-red-400 mt-0.5 text-xl">✕</span>
    <div>
      <h3 class="font-bold">Error</h3>
      <p>${message}</p>
    </div>
  `;
  errorDiv.style.display = "block";

  // Auto-hide after 5 seconds
  setTimeout(() => {
    errorDiv.style.display = "none";
  }, 5000);
}
