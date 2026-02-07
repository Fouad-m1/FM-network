const user = JSON.parse(localStorage.getItem("fm_user")) || {
  username: "Guest",
  points: 0,
  streak: 1
};

// User Info
document.getElementById("username").innerText = user.username;
document.getElementById("avatar").src =
  `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`;

// Achievements List
const achievements = [
  {
    title: "Welcome to FM",
    desc: "Login for the first time",
    unlocked: true
  },
  {
    title: "First Steps",
    desc: "Reach 50 points",
    unlocked: user.points >= 50
  },
  {
    title: "Grinder",
    desc: "Reach 100 points",
    unlocked: user.points >= 100
  },
  {
    title: "Daily Soldier",
    desc: "3 days login streak",
    unlocked: user.streak >= 3
  },
  {
    title: "Weekly Legend",
    desc: "7 days login streak",
    unlocked: user.streak >= 7
  },
  {
    title: "FM OG",
    desc: "Be part of the network",
    unlocked: user.streak >= 1
  }
];

// Render Achievements
const container = document.getElementById("achievementsContainer");

achievements.forEach(a => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.opacity = a.unlocked ? "1" : "0.35";
  card.style.border = a.unlocked
    ? "2px solid var(--accent)"
    : "2px solid transparent";

  card.innerHTML = `
    <h3>${a.title}</h3>
    <p style="color:#94a3b8;margin:8px 0">${a.desc}</p>
    <strong>${a.unlocked ? "Unlocked ✅" : "Locked 🔒"}</strong>
  `;

  container.appendChild(card);
});
