/* =====================================
   FM Network - Main Script
===================================== */

/* ===== Helpers ===== */
const $ = (id) => document.getElementById(id);

/* ===== Modal (About) ===== */
function openAbout() {
  $("aboutModal").classList.add("active");
}

function closeAbout() {
  $("aboutModal").classList.remove("active");
}

/* ===== Theme Switcher ===== */
const themes = {
  dark: {
    "--bg-dark": "#05070d",
    "--neon": "#4fdfff"
  },
  neon: {
    "--bg-dark": "#02030a",
    "--neon": "#ff4fd8"
  }
};

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  Object.keys(themes[theme]).forEach(key => {
    document.documentElement.style.setProperty(
      key,
      themes[theme][key]
    );
  });
}

(function loadTheme() {
  const saved = localStorage.getItem("theme") || "dark";
  setTheme(saved);
})();

/* ===== Language System ===== */
const languages = {
  en: {
    home: "Home",
    about: "About",
    settings: "Settings",
    games: "Games",
    shop: "Shop",
    aboutText: "FM Network is a community built for gamers and developers."
  },
  ar: {
    home: "الرئيسية",
    about: "عن الشبكة",
    settings: "الإعدادات",
    games: "الألعاب",
    shop: "المتجر",
    aboutText: "شبكة FM هي مجتمع معمول للجيمرز والمطورين."
  },
  mix: {
    home: "Home",
    about: "About",
    settings: "Settings",
    games: "Games",
    shop: "Shop",
    aboutText: "شبكة FM هي مجتمع معمول للجيمرز والمطورين."
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-lang]").forEach(el => {
    const key = el.getAttribute("data-lang");
    el.textContent = languages[lang][key];
  });
}

(function loadLanguage() {
  const saved = localStorage.getItem("lang") || "en";
  setLanguage(saved);
})();

/* ===== Daily Login Streak ===== */
function updateStreak() {
  const today = new Date().toDateString();
  const lastLogin = localStorage.getItem("lastLogin");
  let streak = parseInt(localStorage.getItem("streak") || "0");

  if (lastLogin !== today) {
    if (
      lastLogin &&
      new Date(today) - new Date(lastLogin) === 86400000
    ) {
      streak++;
    } else {
      streak = 1;
    }
    localStorage.setItem("lastLogin", today);
    localStorage.setItem("streak", streak);
  }

  if ($("streakCount")) {
    $("streakCount").textContent = streak + " 🔥";
  }
}

updateStreak();

/* ===== Account System (Placeholder) ===== */
function loadAccount(username) {
  // ده مكان الربط مع السيرفر بعدين
  const fakeData = {
    name: username,
    avatar: "https://i.imgur.com/6VBx3io.png",
    rank: "Member"
  };

  $("accountName").textContent = fakeData.name;
  $("accountRank").textContent = fakeData.rank;
  $("accountAvatar").src = fakeData.avatar;
}

/* ===== Auto Demo ===== */
setTimeout(() => {
  loadAccount("FM_User");
}, 500);
