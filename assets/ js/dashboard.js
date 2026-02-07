const user = JSON.parse(localStorage.getItem("fm_user"));

if (!user) {
  window.location.href = "login.html";
}

document.getElementById("username").innerText = user.username;
document.getElementById("points").innerText = user.points;
