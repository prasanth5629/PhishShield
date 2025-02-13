document.querySelectorAll("a[href^='#']").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Function to validate login
function validateLogin(event) {
  event.preventDefault();

  const enteredUsername = document.getElementById('loginUsername').value;
  const enteredPassword = document.getElementById('loginPassword').value;

  const predefinedUsername = "vicky@gmail.com";
  const predefinedPassword = "vicky5629";

  if (enteredUsername === predefinedUsername && enteredPassword === predefinedPassword) {
      closeLoginModal();
      setTimeout(() => {
          window.location.href = "/main";  // Redirect to the Flask route
      }, 1000);
  } else {
      alert("Incorrect username or password. Please try again.");
  }
}

// Open Login Modal
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  document.getElementById('loginModal').style.display = 'flex';
  document.getElementById('loginModal').classList.add('show');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Close Login Modal
function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  document.getElementById('loginModal').style.display = 'none';
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

// Open Registration Modal
function openRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

// Close Registration Modal
function closeRegistrationModal() {
  const modal = document.getElementById('registrationModal');
  modal.classList.remove('show');
  setTimeout(() => {
    modal.style.display = 'none';
  }, 300);
}

function predict() {
  const text = document.getElementById("text").value;
  fetch("/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: text }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("result").innerText = "Prediction: " + data.prediction;
    })
    .catch((error) => console.error("Error:", error));
}

// Toggle between Modals
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('openRegistrationModal').addEventListener('click', (event) => {
    event.preventDefault();
    closeLoginModal();
    setTimeout(openRegistrationModal, 300);
  });

  document.getElementById('backToLoginModal').addEventListener('click', (event) => {
    event.preventDefault();
    closeRegistrationModal();
    setTimeout(openLoginModal, 300);
  });
});

// Close modal on clicking outside content
window.onclick = function (event) {
  const loginModal = document.getElementById('loginModal');
  const registrationModal = document.getElementById('registrationModal');
  if (event.target === loginModal) closeLoginModal();
  if (event.target === registrationModal) closeRegistrationModal();
};
