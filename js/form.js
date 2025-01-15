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

  // Show SweetAlert confirmation for local storage
  Swal.fire({
    title: "Welcome!",
    text: "Your account has been successfully created in Local Storage.",
    icon: "success",
    confirmButtonText: "OK",
  });

  // Store the user data in Firebase
  const firebaseConfig = {
    databaseURL: "https://note-cbdc4-default-rtdb.asia-southeast1.firebasedatabase.app"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // Store user data in Firebase under 'users' node
  const userRef = database.ref('users'); // 'users' will be the parent node for all users
  const newUserRef = userRef.push();  // Create a new entry for each user
  newUserRef.set({
    email: email,
    password: password
  }).then(() => {
    Swal.fire({
      title: 'Success!',
      text: 'Your data has been saved to Firebase!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    // Optionally reset the form
    form.reset();
  }).catch((error) => {
    console.error('Error saving data:', error);
    Swal.fire({
      title: 'Error!',
      text: 'There was an issue saving your data.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  });
});

// Optional: Retrieve data from Firebase (for display or testing)
const retrieveDataFromFirebase = () => {
  const database = firebase.database();
  const userRef = database.ref('users');

  userRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data); // This will log the stored users from Firebase
    // You can then display or process this data as needed
  });
};

// Optional: Call the function to retrieve data after page load
// retrieveDataFromFirebase();  // Uncomment to test retrieving data
