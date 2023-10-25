const usersUrl = "https://reqres.in/api/users/";

// User list element
const usersList = document.querySelector("#users");

// Create dialog elements
const dialog = document.createElement("dialog");
const dialogContent = document.createElement("div");
const dialogAvatar = document.createElement("img");
const dialogName = document.createElement("h2");
const dialogEmail = document.createElement("a");
const dialogClose = document.createElement("button");

// Add button text
dialogClose.textContent = "Close";

// Add classes to dialog elements
dialog.classList.add("dialog");
dialogContent.classList.add("dialog-content");
dialogAvatar.classList.add("dialog-avatar");
dialogName.classList.add("dialog-name");
dialogEmail.classList.add("dialog-email");
dialogClose.classList.add("dialog-close");


// Add content to the dialog
dialogContent.appendChild(dialogAvatar);
dialogContent.appendChild(dialogName);
dialogContent.appendChild(dialogEmail);
dialogContent.appendChild(dialogClose);
dialog.appendChild(dialogContent);

// Add the dialog to the page
document.body.appendChild(dialog);

// Fetch users from the API and render them on the page
fetch(usersUrl)
  .then((response) => response.json())
  .then((data) => {
    const users = data.data;
    users.forEach((user) => {
      // Create all the elements needed for the user card
      const userCard = document.createElement("li");
      const userAvatar = document.createElement("img");
      const userName = document.createElement("h2");

      // Add classes to the elements
      userCard.classList.add("user");
      userAvatar.classList.add("user-avatar");
      userName.classList.add("user-name");

      // Add content to the elements
      userAvatar.src = user.avatar;
      userName.textContent = `${user.first_name} ${user.last_name}`;

      // Add the elements to the user card
      userCard.appendChild(userAvatar);
      userCard.appendChild(userName);

      // Add the user card to the page
      usersList.appendChild(userCard);

      // Make the user card focusable
      userCard.tabIndex = 0;

      // Open the dialog on click 
      userCard.addEventListener("click", () => {
        dialogAvatar.src = user.avatar;
        dialogName.textContent = `${user.first_name} ${user.last_name}`;
        dialogEmail.href = `mailto:${user.email}`;
        dialogEmail.textContent = user.email;

        dialog.showModal();
        // Focus close button on open
        dialog.focus();
      });

      // Open the dialog on enter
      userCard.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          dialogAvatar.src = user.avatar;
          dialogName.textContent = `${user.first_name} ${user.last_name}`;
          dialogEmail.href = `mailto:${user.email}`;
          dialogEmail.textContent = user.email;

          dialog.showModal();
          // Focus close button on open
          dialogClose.focus();
        }
      });
    });

    // Close the dialog on click close button
    dialogClose.addEventListener("click", () => {
      dialog.close();
    });

    // Close the dialog on click outside the dialog
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });


