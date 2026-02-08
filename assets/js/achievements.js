/* =========================================
   FM NETWORK - ACHIEVEMENTS LOGIC
   ========================================= */

const Achievements = {
    list: [
        { id: 'ach_login_1', title: 'Newbie', desc: 'Login for the first time', icon: 'fa-door-open', reward: 10 },
        { id: 'ach_streak_3', title: 'On Fire', desc: 'Reach a 3-day streak', icon: 'fa-fire', reward: 50 },
        { id: 'ach_points_100', title: 'Hoarder', desc: 'Reach 100 Points', icon: 'fa-sack-dollar', reward: 20 },
        { id: 'ach_rich_1000', title: 'Millionaire', desc: 'Reach 1,000 Points', icon: 'fa-gem', reward: 100 },
        { id: 'ach_buyer', title: 'Shopper', desc: 'Buy your first role', icon: 'fa-bag-shopping', reward: 30 }
    ],

    init() {
        if (!App.user) return;
        this.checkConditions(); // Check silently on load
        this.renderAchievements();
    },

    checkConditions() {
        let changed = false;
        const u = App.user;

        // Condition Checks
        const conditions = {
            'ach_login_1': () => true, // If they exist, they logged in
            'ach_streak_3': () => u.streak >= 3,
            'ach_points_100': () => u.points >= 100,
            'ach_rich_1000': () => u.points >= 1000,
            'ach_buyer': () => u.inventory.length >= 1
        };

        this.list.forEach(ach => {
            if (!u.achievements.includes(ach.id)) {
                if (conditions[ach.id] && conditions[ach.id]()) {
                    this.unlock(ach);
                    changed = true;
                }
            }
        });

        if (changed) {
            App.saveUser();
            this.renderAchievements();
        }
    },

    unlock(ach) {
        App.user.achievements.push(ach.id);
        App.user.points += ach.reward; // Bonus reward
        alert(`🏆 Achievement Unlocked: ${ach.title}! (+${ach.reward} pts)`);
    },

    renderAchievements() {
        const container = document.getElementById('achievements-grid');
        if (!container) return;

        container.innerHTML = '';

        this.list.forEach(ach => {
            const isUnlocked = App.user.achievements.includes(ach.id);
            const statusClass = isUnlocked ? 'unlocked' : 'locked';
            const color = isUnlocked ? 'var(--primary)' : 'var(--text-muted)';
            const opacity = isUnlocked ? '1' : '0.5';
            const glow = isUnlocked ? `0 0 15px var(--primary-glow)` : 'none';

            const card = document.createElement('div');
            card.className = 'card';
            card.style.textAlign = 'center';
            card.style.opacity = opacity;
            
            if(isUnlocked) {
                 card.style.borderColor = 'var(--primary)';
                 card.style.boxShadow = glow;
            }

            card.innerHTML = `
                <div style="padding:1rem;">
                    <i class="fa-solid ${ach.icon}" style="font-size:3rem; color:${color}; margin-bottom:1rem;"></i>
                    <h3 style="margin-bottom:0.5rem; color:${color}">${ach.title}</h3>
                    <p style="color:var(--text-muted); margin-bottom:1rem;">${ach.desc}</p>
                    <span style="font-size:0.8rem; background:rgba(0,0,0,0.3); padding:4px 8px; border-radius:4px; color:${color}">
                        ${isUnlocked ? '<i class="fa-solid fa-check"></i> Unlocked' : 'Locked'}
                    </span>
                </div>
            `;
            container.appendChild(card);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => Achievements.init());
