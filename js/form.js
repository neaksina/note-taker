const form = document.getElementById("signup-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Retrieve existing users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array
    users.push({ email, password });

    // Store the updated users array back to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Show SweetAlert confirmation
    Swal.fire({
      title: "Welcome!",
      text: "Your account has been successfully created.",
      icon: "success",
      confirmButtonText: "OK",
    });

    // Optionally, clear the form fields
    form.reset();
  });