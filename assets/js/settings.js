/* =========================================
   FM NETWORK - SETTINGS LOGIC
   ========================================= */

const Settings = {
    init() {
        this.renderSettings();
    },

    renderSettings() {
        if (!App.user) return;
        
        // Highlight active lang
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.dataset.lang === App.user.settings.lang) {
                btn.classList.add('active-lang');
                btn.style.borderColor = 'var(--primary)';
                btn.style.color = 'var(--primary)';
            } else {
                btn.classList.remove('active-lang');
                btn.style.borderColor = 'rgba(255,255,255,0.1)';
                 btn.style.color = 'var(--text-muted)';
            }
        });
    },

    setLanguage(lang) {
        if (!App.user) return;
        
        App.user.settings.lang = lang;
        App.saveUser();
        
        // Re-render
        App.applySettings(); // Applies direction and translation
        this.renderSettings(); // Re-highlight buttons
        
        // Reload might be needed if complex layout changes, but we try dynamic first
        // location.reload(); 
    },

    resetAccount() {
        if (confirm("WARNING: This will delete your account, points, and items forever. Are you sure?")) {
            App.logout();
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Settings.init());
