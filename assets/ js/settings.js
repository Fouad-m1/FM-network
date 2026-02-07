let user = JSON.parse(localStorage.getItem("fm_user")) || {
  username: "Guest",
  points: 0,
  streak: 1,
  theme: "dark",
  lang: "en"
};

// Avatar + Name
document.getElementById("username").innerText = user.username;
document.getElementById("avatar").src =
  `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`;

// Inputs
document.getElementById("nameInput").value = user.username;
document.getElementById("langSelect").value = user.lang;

// Save Username
function saveUsername() {
  user.username = document.getElementById("nameInput").value || "Guest";
  localStorage.setItem("fm_user", JSON.stringify(user));
  location.reload();
}

// Theme Switcher
function setTheme(theme) {
  user.theme = theme;
  localStorage.setItem("fm_user", JSON.stringify(user));

  if (theme === "neon") {
    document.documentElement.style.setProperty("--accent", "#38bdf8");
    document.documentElement.style.setProperty("--bg", "#020617");
  } else {
    document.documentElement.style.setProperty("--accent", "#22c55e");
    document.documentElement.style.setProperty("--bg", "#020617");
  }
}

// Language
function changeLang() {
  user.lang = document.getElementById("langSelect").value;
  localStorage.setItem("fm_user", JSON.stringify(user));
  updateInfo();
}

// Info Box
function updateInfo() {
  const info = document.getElementById("infoBox");

  if (user.lang === "ar") {
    info.innerText = `
الاسم: ${user.username}
النقاط: ${user.points}
عدد أيام الدخول: ${user.streak}
`;
  } else if (user.lang === "mix") {
    info.innerText = `
Name: ${user.username}
النقاط: ${user.points}
Login Streak: ${user.streak}
`;
  } else {
    info.innerText = `
Name: ${user.username}
Points: ${user.points}
Login Streak: ${user.streak}
`;
  }
}

updateInfo();
