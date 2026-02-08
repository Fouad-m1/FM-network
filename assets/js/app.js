/* =========================================
   FM NETWORK - CORE APP LOGIC
   ========================================= */

const APP_VERSION = '1.0.0';
const DB_KEY = 'fm_network_user_v1';

// Default User State
const defaultUser = {
    username: 'Guest',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Guest',
    points: 0,
    streak: 0,
    lastLogin: null,
    inventory: [], // Owned roles
    achievements: [], // Unlocked achievement IDs
    settings: {
        theme: 'dark',
        lang: 'en'
    }
};

// State Interface
const App = {
    user: null,

    init() {
        this.loadUser();
        this.applySettings();
        this.renderGlobalUI();
        this.checkAuth();
        this.bindEvents();
    },

    loadUser() {
        const stored = localStorage.getItem(DB_KEY);
        if (stored) {
            this.user = JSON.parse(stored);
        } else {
            // No user found, we wait for login
            this.user = null;
        }
    },

    saveUser() {
        if (this.user) {
            localStorage.setItem(DB_KEY, JSON.stringify(this.user));
            this.renderGlobalUI(); // Auto-update UI on save
        }
    },

    login(username) {
        if (!username.trim()) return;
        
        this.user = JSON.parse(JSON.stringify(defaultUser)); // Clone default
        this.user.username = username;
        this.user.avatar = `https://api.dicebear.com/9.x/avataaars/svg?seed=${username}`;
        this.user.lastLogin = new Date().toISOString(); // First login
        
        this.saveUser();
        window.location.reload();
    },

    logout() {
        // Just clear data for the demo, or reset to prompt
        if(confirm('Are you sure you want to reset all data? This cannot be undone.')) {
            localStorage.removeItem(DB_KEY);
            window.location.reload();
        }
    },

    checkAuth() {
        const currentPath = window.location.pathname;
        const isAuthPage = document.getElementById('login-modal');

        // Simple auth check: if no user, show modal
        if (!this.user) {
            this.showLoginModal();
        }
    },

    showLoginModal() {
        const modal = document.getElementById('login-modal');
        if (modal) modal.classList.add('active');
    },

    applySettings() {
        if (!this.user) return;
        
        // Theme
        // If we had more themes we would toggle classes here
        // Current design is dark-only base but we can adjust later
        
        // Language
        document.documentElement.lang = this.user.settings.lang;
        this.translatePage();
    },

    translatePage() {
        const lang = this.user ? this.user.settings.lang : 'en';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (Translations[lang] && Translations[lang][key]) {
                el.innerText = Translations[lang][key];
            }
        });
        
        // Handle mixed arabic direction if needed
        if(lang === 'ar') {
            document.body.style.direction = 'rtl';
        } else {
             document.body.style.direction = 'ltr';
        }
    },

    renderGlobalUI() {
        if (!this.user) return;

        // Update all elements with specific data-bind attributes
        document.querySelectorAll('[data-bind="username"]').forEach(el => el.innerText = this.user.username);
        document.querySelectorAll('[data-bind="points"]').forEach(el => el.innerText = this.user.points.toLocaleString());
        document.querySelectorAll('[data-bind="streak"]').forEach(el => el.innerText = this.user.streak);
        
        // Update Avatars
        document.querySelectorAll('[data-bind="avatar"]').forEach(el => el.src = this.user.avatar);
    },

    bindEvents() {
        // Mobile Nav Logic
        // Highlight active link
        const currentFile = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(link => {
            if(link.getAttribute('href') === currentFile) {
                link.classList.add('active');
            }
        });
    }
};

// Simple Translation Dictionary
const Translations = {
    en: {
        "dashboard": "Dashboard",
        "games": "Games",
        "shop": "Shop",
        "achievements": "Achievements",
        "settings": "Settings",
        "welcome": "Welcome back,",
        "points": "Points",
        "streak": "Day Streak",
        "roles": "Roles Owned"
    },
    ar: {
        "dashboard": "لوحة التحكم",
        "games": "الألعاب",
        "shop": "المتجر",
        "achievements": "الإنجازات",
        "settings": "الإعدادات",
        "welcome": "مرحباً،",
        "points": "النقاط",
        "streak": "تتابع يومي",
        "roles": "الرتب"
    }
}

// Global scope
window.App = App;

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
