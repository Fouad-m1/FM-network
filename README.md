# FM Network Dashboard

A neon-themed, client-side gaming community dashboard built with generic HTML, professional CSS, and Vanilla JavaScript.

## 🚀 Features

- **Local Account System**: Uses `localStorage` to save progress, points, and items without a backend.
- **Gamification**:
  - **Points System**: Earn points by playing games or daily logins.
  - **Daily Login Streak**: Keeps track of consecutive logins.
  - **Achievements**: Unlock trophies based on your activity.
- **Shop**: Buy exclusive Discord roles with your earned points.
- **Responsive Design**: Mobile-friendly layout with a collapsible sidebar/bottom nav.
- **Settings**: Toggle between English and Arabic, or reset your data.

## 📂 Project Structure

```text
/
├─ index.html        # Main Dashboard
├─ games.html        # Daily Rewards & Mini-games
├─ shop.html         # Role Shop
├─ achievements.html # Trophies
├─ settings.html     # User Preferences
└─ assets/
   ├─ css/
   │  └─ style.css   # Main Stylesheet
   └─ js/
      ├─ app.js      # Core Logic (User State)
      ├─ games.js    # Game Mechanics
      ├─ shop.js     # Shop Mechanics
      ├─ achievements.js # Unlock Logic
      └─ settings.js # preferences
```

## 🛠️ How to Use

1.  **Local Testing**:
    *   Simply double-click `index.html` to open it in your browser.
    *   Enter a username to create your local account.

2.  **Hosting**:
    *   Upload all files to a generic web host (e.g., GitHub Pages, Netlify, Vercel).
    *   No build process required. It is 100% static.

## 🎨 Customization

*   **Colors**: Edit `assets/css/style.css` `:root` variables to change the neon theme.
*   **Items**: Edit `assets/js/shop.js` to change the roles/items available in the shop.
*   **Achievements**: Edit `assets/js/achievements.js` to add new trophies.

## ⚠️ Note

Since this uses `localStorage`, clearing your browser cache/cookies for this site will wipe your progress.
