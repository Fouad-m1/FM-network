function login() {
  const username = document.getElementById("usernameInput").value;

  if (!username) {
    alert("Enter username");
    return;
  }

  const user = {
    username: username,
    points: 0
  };

  localStorage.setItem("fm_user", JSON.stringify(user));
  window.location.href = "index.html";
}
