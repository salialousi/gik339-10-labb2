async function fetchUsers() {
  try {
    console.log("Starting fetch request...");
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const users = await response.json();
    console.log("Fetched users:", users);
    renderUsers(users);
  } catch (error) {
    console.error("An error occurred while fetching users:", error);
    const errorMessage = document.createElement("p");
    errorMessage.textContent =
      "Could not fetch users. Check the server connection.";
    document.body.appendChild(errorMessage);
  }
}


function renderUsers(users) {
  const userList = document.getElementById("users-list");
  userList.innerHTML = "";
  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
          <span>${user.firstName} ${user.lastName}</span>
          <span style="color: ${user.color};">${user.username}</span>
      `;
    userList.appendChild(listItem);
  });
}


fetchUsers();
