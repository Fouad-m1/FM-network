/* =========================================
   FM NETWORK - SHOP LOGIC
   ========================================= */

const Shop = {
    items: [
        { id: 'role_gamer', name: 'Gamer', price: 100, icon: 'fa-gamepad', color: '#00f3ff' },
        { id: 'role_vip', name: 'VIP', price: 500, icon: 'fa-crown', color: '#ffcc00' },
        { id: 'role_pro', name: 'Pro Player', price: 1000, icon: 'fa-user-astronaut', color: '#bc13fe' },
        { id: 'role_legend', name: 'Legend', price: 5000, icon: 'fa-dragon', color: '#ff4757' },
        { id: 'role_wealthy', name: 'Wealthy', price: 10000, icon: 'fa-money-bill-wave', color: '#00ff9d' }
    ],

    init() {
        if (!App.user) return;
        this.renderShop();
    },

    renderShop() {
        const container = document.getElementById('shop-grid');
        if (!container) return;

        container.innerHTML = '';

        this.items.forEach(item => {
            const isOwned = App.user.inventory.includes(item.id);
            const canAfford = App.user.points >= item.price;
            
            const card = document.createElement('div');
            card.className = 'card';
            card.style.textAlign = 'center';
            // Subtle glow based on item color
            card.style.borderTop = `2px solid ${item.color}`;

            let btnHtml = '';
            
            if (isOwned) {
                btnHtml = `<button class="btn" disabled style="width:100%; justify-content:center; background:rgba(255,255,255,0.1); color:var(--text-muted);">
                             <i class="fa-solid fa-check"></i> Owned
                           </button>`;
            } else {
                if (canAfford) {
                    btnHtml = `<button class="btn btn-primary" style="width:100%; justify-content:center; background:${item.color}; color:#000;" 
                                onclick="Shop.buyItem('${item.id}')">
                                 Buy for ${item.price} pts
                               </button>`;
                } else {
                    btnHtml = `<button class="btn" disabled style="width:100%; justify-content:center; background:rgba(255,71,87,0.1); color:var(--danger);">
                                 Need ${item.price} pts
                               </button>`;
                }
            }

            card.innerHTML = `
                <div style="padding:1rem;">
                    <i class="fa-solid ${item.icon}" style="font-size:3rem; color:${item.color}; margin-bottom:1rem; text-shadow:0 0 15px ${item.color};"></i>
                    <h3 style="margin-bottom:0.5rem;">${item.name}</h3>
                    <p style="color:var(--text-muted); margin-bottom:1.5rem;">Exclusive Discord Role</p>
                    ${btnHtml}
                </div>
            `;

            container.appendChild(card);
        });
    },

    buyItem(id) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;

        if (App.user.points < item.price) {
            alert("Not enough points!");
            return;
        }

        if (confirm(`Purchase ${item.name} for ${item.price} points?`)) {
            App.user.points -= item.price;
            App.user.inventory.push(id);
            App.saveUser();
            
            this.renderShop();
            alert(`🎉 Successfully bought ${item.name}!`);
            
            // Trigger updated roles count in sidebar if visible
            if(document.getElementById('roles-count')) {
                document.getElementById('roles-count').innerText = App.user.inventory.length;
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => Shop.init());
