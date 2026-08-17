// E-Commerce Shopping Bag Drawer Logic
class ShoppingCart {
    constructor() {
        this.items = [];
        this.bagCountEl = document.querySelector('.bag-count');
        this.bagDrawerEl = document.getElementById('bag-drawer');
        this.drawerItemsEl = document.getElementById('bag-items-list');
        this.bagTotalEl = document.getElementById('bag-total-amount');
        this.overlayEl = document.getElementById('drawer-overlay');
        this.bagToggleBtn = document.getElementById('bag-toggle');
        this.closeBagBtn = document.getElementById('close-bag');
        
        this.init();
    }

    init() {
        // Toggle drawer
        this.bagToggleBtn.addEventListener('click', () => this.openDrawer());
        this.closeBagBtn.addEventListener('click', () => this.closeDrawer());
        this.overlayEl.addEventListener('click', () => this.closeDrawer());

        // Add to bag listeners
        document.querySelectorAll('.add-to-bag-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.getAttribute('data-name');
                const price = parseFloat(e.target.getAttribute('data-price'));
                this.addItem(name, price);
                this.openDrawer();
            });
        });

        // Checkout listener
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    }

    openDrawer() {
        this.bagDrawerEl.classList.add('open');
        this.overlayEl.classList.add('active');
    }

    closeDrawer() {
        this.bagDrawerEl.classList.remove('open');
        this.overlayEl.classList.remove('active');
    }

    addItem(name, price) {
        this.items.push({ name, price });
        this.updateCartUI();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.updateCartUI();
    }

    updateCartUI() {
        this.bagCountEl.textContent = this.items.length;

        // Clear list
        this.drawerItemsEl.innerHTML = '';

        if (this.items.length === 0) {
            this.drawerItemsEl.innerHTML = '<div class="empty-bag-message">Your bag is empty.</div>';
            this.bagTotalEl.textContent = '$0';
            return;
        }

        let total = 0;
        this.items.forEach((item, index) => {
            total += item.price;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.name}</span>
                    <span class="cart-item-price">$${item.price}</span>
                </div>
                <button class="remove-item-btn" data-index="${index}">Remove</button>
            `;
            this.drawerItemsEl.appendChild(itemEl);
        });

        this.bagTotalEl.textContent = `$${total}`;

        // Add delete listeners
        this.drawerItemsEl.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                this.removeItem(idx);
            });
        });
    }

    checkout() {
        if (this.items.length === 0) {
            alert('Your shopping bag is empty.');
            return;
        }

        // Group identical items to show quantities nicely
        const itemGroups = {};
        this.items.forEach(item => {
            if (itemGroups[item.name]) {
                itemGroups[item.name].quantity += 1;
                itemGroups[item.name].totalPrice += item.price;
            } else {
                itemGroups[item.name] = {
                    price: item.price,
                    quantity: 1,
                    totalPrice: item.price
                };
            }
        });

        // Construct the WhatsApp message
        let message = `*Athletic You - New Order*\n\n`;
        let grandTotal = 0;
        
        Object.keys(itemGroups).forEach(name => {
            const group = itemGroups[name];
            message += `• *${name}* (x${group.quantity}) - $${group.totalPrice}\n`;
            grandTotal += group.totalPrice;
        });
        
        message += `\n*Grand Total:* $${grandTotal}\n\n`;
        message += `Please confirm my order and send payment details. Thank you!`;

        // Phone number format: Nigeria +234
        const phoneNumber = '2348126708708';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
    }
}

// Image View Click Toggler
class ProductViewToggler {
    constructor() {
        this.init();
    }

    init() {
        const productContainers = document.querySelectorAll('.card-image-container');
        
        productContainers.forEach(container => {
            const parent = container.parentElement;
            const toggleButtons = parent.querySelectorAll('.view-toggles .toggle-btn');
            const images = container.querySelectorAll('.product-image');

            toggleButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active from all buttons in this card
                    toggleButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    const targetView = btn.getAttribute('data-target');

                    // Fade out/in images
                    images.forEach(img => {
                        if (img.getAttribute('data-view') === targetView) {
                            img.classList.add('active');
                        } else {
                            img.classList.remove('active');
                        }
                    });
                });
            });
        });
    }
}

// 3D Tilt Effect for premium cards
class CardTiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('[data-tilt]');
        this.init();
    }

    init() {
        // Only run tilt effect on devices with hover support to prevent mobile touch glitches
        if (window.matchMedia('(hover: hover)').matches) {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMove(e, card));
                card.addEventListener('mouseleave', () => this.handleLeave(card));
            });
        }
    }

    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xc = rect.width / 2;
        const yc = rect.height / 2;

        const tiltX = (yc - y) / 15;
        const tiltY = (x - xc) / 15;

        // Apply style to inner container if card, else directly
        const target = card.querySelector('.product-card-inner') || card;
        target.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    handleLeave(card) {
        const target = card.querySelector('.product-card-inner') || card;
        target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        target.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }
}

// Scroll reveal using Intersection Observer
class ScrollReveal {
    constructor() {
        this.revealItems = document.querySelectorAll('.reveal-item');
        this.init();
    }

    init() {
        const observerOptions = {
            root: null,
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.revealItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize everything on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
    new ProductViewToggler();
    new CardTiltEffect();
    new ScrollReveal();
    
    // Animate Header on Scroll
    const header = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});
