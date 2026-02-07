let user = JSON.parse(localStorage.getItem("fm_user"));

if (!user) {
  user = {
    username: "Guest",
    points: 0,
    streak: 1,
    lastLogin: null
  };
}

// Avatar
document.getElementById("avatar").src =
  `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`;

document.getElementById("username").innerText = user.username;

// Daily Login
const today = new Date().toDateString();

if (user.lastLogin !== today) {
  if (user.lastLogin) {
    const diff =
      (new Date(today) - new Date(user.lastLogin)) / (1000 * 60 * 60 * 24);

    user.streak = diff === 1 ? user.streak + 1 : 1;
  }

  user.points += 10;
  user.lastLogin = today;
}

document.getElementById("points").innerText = user.points;
document.getElementById("streak").innerText = user.streak + " Days";

localStorage.setItem("fm_user", JSON.stringify(user));

// About Modal
const modal = document.getElementById("aboutModal");
document.getElementById("aboutBtn").onclick = () => modal.style.display = "flex";
document.getElementById("closeAbout").onclick = () => modal.style.display = "none";
