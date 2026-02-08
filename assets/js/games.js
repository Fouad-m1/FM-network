/* =========================================
   FM NETWORK - GAMES LOGIC
   ========================================= */

const Games = {
    init() {
        if (!App.user) return; // Wait for core init if needed, though script is at end of body
        this.renderDailyLogin();
    },

    // ============================
    // DAILY LOGIN SYSTEM
    // ============================
    claimDaily() {
        const today = new Date().toDateString();
        const lastLoginDate = App.user.lastLoginDate || ""; // Using a separate field for partial day checks if needed, or just reusing lastLogin
        
        // We need to compare "days" not just timestamps
        // Let's store a specific 'lastDailyClaim' in user settings or root
        
        if (this.hasClaimedToday()) {
            alert("Already claimed today! Come back tomorrow.");
            return;
        }

        // Logic for streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (App.user.lastDailyClaim === yesterday.toDateString()) {
            App.user.streak++;
        } else {
            // Missed a day (or first time) -> Reset streak if it wasn't today
            // If it's first claim ever, streak is 1
            App.user.streak = 1;
        }

        const reward = 50 + (App.user.streak * 10);
        App.user.points += reward;
        App.user.lastDailyClaim = today;

        App.saveUser();
        this.renderDailyLogin();
        
        // visual feedback
        alert(`Daily Reward Claimed! +${reward} Points`);
    },

    hasClaimedToday() {
        const today = new Date().toDateString();
        return App.user.lastDailyClaim === today;
    },

    renderDailyLogin() {
        const btn = document.getElementById('daily-btn');
        const status = document.getElementById('daily-status');
        
        if (!btn) return;

        if (this.hasClaimedToday()) {
            btn.disabled = true;
            btn.innerText = "Claimed";
            btn.classList.add('btn-disabled'); // We can style this
            status.innerHTML = `<span style="color:var(--success)">Claims reset at midnight. Streak: ${App.user.streak} <i class="fa-solid fa-fire"></i></span>`;
        } else {
            btn.disabled = false;
            btn.innerText = "Claim Reward";
            btn.classList.remove('btn-disabled');
            status.innerHTML = `<span style="color:var(--text-muted)">Streak: ${App.user.streak} days. Reward: ${50 + (App.user.streak * 10)} pts</span>`;
        }
    },

    // ============================
    // MINI GAMES
    // ============================
    
    // 1. Neon Clicker (Fast money but boring)
    clickerGame() {
        const cost = 0; // Free to click? Maybe limit clicks?
        // Let's make it a simple "Click to earn 1 point"
        // Prevent autoclickers slightly with throttling?
        
        if(this.clickDebounce) return;
        this.clickDebounce = true;
        setTimeout(() => this.clickDebounce = false, 100); // 100ms limit

        App.user.points += 1;
        App.saveUser();
        
        // Floating text effect (visual only)
        this.showFloatingText(event.clientX, event.clientY, "+1");
    },

    // 2. Lucky Dice (Risk points)
    rollDice(bet) {
        if (App.user.points < bet) {
            alert("Not enough points!");
            return;
        }

        const roll = Math.floor(Math.random() * 6) + 1;
        const resultEl = document.getElementById('dice-result');
        
        // Animation simulation
        resultEl.innerText = "Rolling...";
        
        setTimeout(() => {
            resultEl.innerText = roll;
            
            if (roll >= 4) {
                // Win 1.5x
                const win = Math.floor(bet * 1.5);
                App.user.points = App.user.points - bet + win; // Net profit
                alert(`Rolled a ${roll}! You won ${win} points.`);
            } else {
                App.user.points -= bet;
                alert(`Rolled a ${roll}. You lost ${bet} points.`);
            }
            App.saveUser();
        }, 600);
    },

    showFloatingText(x, y, text) {
        const el = document.createElement('div');
        el.innerText = text;
        el.style.position = 'fixed';
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.color = 'var(--success)';
        el.style.fontWeight = 'bold';
        el.style.pointerEvents = 'none';
        el.style.transition = 'all 0.8s ease';
        el.style.zIndex = '1000';
        document.body.appendChild(el);

        requestAnimationFrame(() => {
            el.style.transform = 'translateY(-50px)';
            el.style.opacity = '0';
        });

        setTimeout(() => el.remove(), 800);
    }
};

// Start logic when loaded
document.addEventListener('DOMContentLoaded', () => Games.init());
