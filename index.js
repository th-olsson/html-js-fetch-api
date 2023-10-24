const usersUrl = "https://reqres.in/api/users/";

// Create elements users list and dialog
const usersList = document.querySelector("#users");
const dialog = document.createElement("dialog");
const dialogContent = document.createElement("div");
const dialogAvatar = document.createElement("img");
const dialogName = document.createElement("h2");
const dialogEmail = document.createElement("a");
const dialogClose = document.createElement("button");

// Add classes to the elements
dialog.classList.add("dialog");
dialogContent.classList.add("dialog-content");
dialogAvatar.classList.add("dialog-avatar");
dialogName.classList.add("dialog-name");
dialogEmail.classList.add("dialog-email");
dialogClose.classList.add("dialog-close");

// Add content to the dialog close button
dialogClose.textContent = "Close";

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

      userCard.tabIndex = 0;

      // Add event listeners to the user card
      userCard.addEventListener("click", () => {
        dialogAvatar.src = user.avatar;
        dialogName.textContent = `${user.first_name} ${user.last_name}`;
        dialogEmail.href = `mailto:${user.email}`;
        dialogEmail.textContent = user.email;

        dialog.showModal();
      });

      userCard.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
          dialogAvatar.src = user.avatar;
          dialogName.textContent = `${user.first_name} ${user.last_name}`;
          dialogEmail.href = `mailto:${user.email}`;
          dialogEmail.textContent = user.email;

          userCard.blur(); // Prevent the dialog from reopening on close //TODO: Fix this
          dialog.showModal();
        }
      });
    });
  });

// Add event listeners to dialog close
dialogClose.addEventListener("click", () => {
  dialog.close();
});

dialogClose.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    dialog.close();
  }
}
);

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

