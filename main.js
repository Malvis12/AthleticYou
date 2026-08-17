// ==========================================================================
// ATHLETIC YOU V2 — CENTRAL PRODUCT & APP DATABASE
// ==========================================================================

const PRODUCT_DATABASE = [
    {
        id: "p1",
        name: "Premium Dumbbells",
        slug: "premium-dumbbells",
        category: "STRENGTH",
        subcategory: "Weights",
        price: 180000,
        compareAtPrice: 220000,
        images: {
            primary: "Dumbbell.jpg",
            secondary: "AY.jpg"
        },
        rating: 4.9,
        reviewCount: 38,
        description: "Solid cast-iron dumbbells featuring premium knurled handles for a secure grip. Designed to fit in any home strength routine without the clutter of traditional iron plates.",
        shortDescription: "Cast-iron hardware with knurled grip handles.",
        features: [
            "Heavy-duty solid cast iron construction",
            "Diamond knurling for secure anti-slip training",
            "Matte powder-coated finish for premium tactility",
            "Hexagonal anti-rolling design"
        ],
        specifications: {
            "Material": "Solid Cast Iron, Matte Coating",
            "Weight": "20kg (10kg per dumbbell)",
            "Grip Diameter": "32mm",
            "Dimensions": "28cm x 15cm x 15cm",
            "Color": "Matte Stealth Black",
            "Warranty": "1-Year Structural Warranty"
        },
        includedItems: [
            "2x 10kg Premium Dumbbells",
            "1x Custom Storage Stand",
            "1x Training Guide Blueprint"
        ],
        variants: ["20kg Set", "30kg Set (+₦40,000)"]
    },
    {
        id: "p2",
        name: "Gym-Grade Kettlebell",
        slug: "gym-grade-kettlebell",
        category: "STRENGTH",
        subcategory: "Weights",
        price: 120000,
        compareAtPrice: 150000,
        images: {
            primary: "https://images.pexels.com/photos/13863727/pexels-photo-13863727.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/kettlebell_detail.svg"
        },
        rating: 4.8,
        reviewCount: 22,
        description: "Ergonomically designed cast iron kettlebell with a wide textured handle. Perfect for swings, clean-and-presses, and functional full-body conditioning.",
        shortDescription: "Wide-grip textured cast-iron conditioning weight.",
        features: [
            "Flat non-wobble base for clean stability",
            "Extra-wide grip handle for single or double-hand use",
            "Textured finish holds chalk perfectly",
            "Single-cast iron build with zero welds"
        ],
        specifications: {
            "Material": "Single-piece Cast Iron",
            "Weight": "16kg",
            "Handle Width": "18.5cm",
            "Base Diameter": "12.5cm",
            "Finish": "Textured Powder Coat",
            "Warranty": "1-Year Structural Warranty"
        },
        includedItems: [
            "1x 16kg Premium Kettlebell",
            "1x Kettlebell Conditioning Routine Guide"
        ],
        variants: ["16kg", "24kg (+₦35,000)"]
    },
    {
        id: "p3",
        name: "HD Resistance Bands",
        slug: "hd-resistance-bands",
        category: "FOUNDATION",
        subcategory: "Accessories",
        price: 35000,
        compareAtPrice: 45000,
        images: {
            primary: "https://images.pexels.com/photos/19330505/pexels-photo-19330505.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/bands_detail.svg"
        },
        rating: 4.7,
        reviewCount: 45,
        description: "Heavy-duty latex resistance loop bands designed for mobility work, progressive strength overload, and pull-up assistance.",
        shortDescription: "Premium natural latex loop resistance training kit.",
        features: [
            "100% natural snap-resistant Malaysian latex",
            "5 distinct resistance levels included in the set",
            "Anti-friction nylon carrying pouch",
            "Maintains tension profiles after years of use"
        ],
        specifications: {
            "Material": "Premium Malaysian Natural Latex",
            "Lengths": "208cm loop circumference",
            "Thickness": "4.5mm",
            "Resistance Levels": "Light (5-15lbs) to Extra Heavy (50-125lbs)",
            "Bag": "Reinforced Nylon Mesh",
            "Warranty": "6-Month Snap Warranty"
        },
        includedItems: [
            "5x Resistance Loop Bands",
            "1x Door Anchor Attachment",
            "2x Cushioned Foam Handles",
            "1x Nylon Travel Carrier"
        ],
        variants: ["Full 5-Band Kit"]
    },
    {
        id: "p4",
        name: "Pro Speed Jump Rope",
        slug: "pro-speed-jump-rope",
        category: "FOUNDATION",
        subcategory: "Accessories",
        price: 15000,
        compareAtPrice: 20000,
        images: {
            primary: "https://images.pexels.com/photos/8478702/pexels-photo-8478702.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/jumprope_detail.svg"
        },
        rating: 4.9,
        reviewCount: 64,
        description: "Fully adjustable speed jump rope with 360-degree ball bearings in the handles for effortless rotations and high-intensity cardio conditioning.",
        shortDescription: "Ultra-fast adjustable cable conditioning rope.",
        features: [
            "Smooth 360° steel ball-bearing mechanism",
            "Kink-resistant PVC coated steel cable",
            "Adjustable screw mechanism to fit any height",
            "Textured aluminum handles with sweat-wicking wrap"
        ],
        specifications: {
            "Material": "Anodized Aluminum, Steel Wire, PVC",
            "Cable Length": "3 meters (Fully Adjustable)",
            "Handle Length": "14cm",
            "Weight": "180g",
            "Bearing Type": "Industrial Steel Ball Bearings",
            "Warranty": "6-Month Warranty"
        },
        includedItems: [
            "1x Pro Speed Rope Assembly",
            "1x Spare Steel Cable",
            "2x Cable Protection Tubes",
            "1x Travel pouch"
        ],
        variants: ["Stealth Black", "Carbon Gray"]
    },
    {
        id: "p5",
        name: "High-Density Yoga Mat",
        slug: "high-density-yoga-mat",
        category: "FOUNDATION",
        subcategory: "Floor Mats",
        price: 45000,
        compareAtPrice: 55000,
        images: {
            primary: "https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/yogamat_detail.svg"
        },
        rating: 4.8,
        reviewCount: 31,
        description: "Thick, non-slip textured yoga and exercise mat offering supreme cushioning for joints, high stability for balances, and complete moisture resistance.",
        shortDescription: "Cushioned non-slip eco-TPE home training floor mat.",
        features: [
            "Dual-sided textured surface for absolute non-slip traction",
            "6mm high-density thermal plastic elastomer cushioning",
            "100% non-toxic, eco-friendly TPE materials",
            "Wipe-clean waterproof closed-cell design"
        ],
        specifications: {
            "Material": "Eco-Friendly High-Density TPE",
            "Dimensions": "183cm x 61cm",
            "Thickness": "6mm",
            "Weight": "950g",
            "Texture": "Wave Pattern Traction",
            "Warranty": "1-Year Performance Warranty"
        },
        includedItems: [
            "1x High-Density TPE Exercise Mat",
            "1x Heavy-Duty Elastic Carry Strap",
            "1x Clean & Maintenance Guide"
        ],
        variants: ["Onyx Black", "Stealth Navy"]
    },
    {
        id: "p6",
        name: "Wide Wheel Ab Roller",
        slug: "wide-wheel-ab-roller",
        category: "FOUNDATION",
        subcategory: "Core",
        price: 20000,
        compareAtPrice: 25000,
        images: {
            primary: "https://images.pexels.com/photos/8033019/pexels-photo-8033019.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/abroller_detail.svg"
        },
        rating: 4.6,
        reviewCount: 19,
        description: "Ultra-wide stability wheel ab roller featuring ergonomic foam handles and internal resistance mechanisms to build deep core strength safely.",
        shortDescription: "Stable wide-tread wheel core trainer.",
        features: [
            "Extra-wide rubber tread wheel prevents tipping",
            "Ergonomic angled handles isolate core muscle groups",
            "High-tensile internal steel core bar",
            "Includes thick knee cushioning pad"
        ],
        specifications: {
            "Material": "High-Density ABS, TPR Rubber, Steel Core",
            "Wheel Width": "9.5cm",
            "Wheel Diameter": "19cm",
            "Handle length": "13.5cm",
            "Max Capacity": "150kg",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x Wide-Tread Ab Roller",
            "1x High-Density Foam Knee Pad",
            "1x Abs & Core Workout Blueprint"
        ],
        variants: ["Standard Stealth"]
    },
    {
        id: "p7",
        name: "Heavy Stability Ball",
        slug: "heavy-stability-ball",
        category: "FOUNDATION",
        subcategory: "Stability",
        price: 25000,
        compareAtPrice: 30000,
        images: {
            primary: "https://images.pexels.com/photos/32610335/pexels-photo-32610335.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/sliders_detail.svg"
        },
        rating: 4.7,
        reviewCount: 15,
        description: "Gym-grade anti-burst stability ball designed to improve balance, core definition, posture, and active sitting configurations.",
        shortDescription: "Anti-burst textured gym stability ball.",
        features: [
            "Anti-burst design rates up to 2000 lbs",
            "Matte slip-resistant surface rings",
            "Includes fast double-action foot inflation pump",
            "Thick eco-friendly PVC walls"
        ],
        specifications: {
            "Material": "Thick Anti-Burst Eco-PVC",
            "Diameter": "65cm (Ideal for heights 5'4\" to 5'11\")",
            "Weight Rating": "900kg (2000 lbs)",
            "Weight": "1.2kg",
            "Colors": "Carbon Black",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x Gym-Grade Stability Ball",
            "1x Double-Action Foot Pump",
            "2x Air Plugs",
            "1x Plug Removal Tool"
        ],
        variants: ["65cm Onyx"]
    },
    {
        id: "p8",
        name: "Multi-Grip Pull-Up Bar",
        slug: "multi-grip-pull-up-bar",
        category: "FOUNDATION",
        subcategory: "Bodyweight",
        price: 60000,
        compareAtPrice: 75000,
        images: {
            primary: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkCM6ecPwkdXQW_AhZUAKupifnPGX2NdHZrlrifPDG5Ysa2IhSbxjP79MCW60j28LPF56l8-lNKdSDFb2OE_h0vY83zYuLuLifauEU2e0&usqp=CAc",
            secondary: "assets/pullup_detail.svg"
        },
        rating: 4.8,
        reviewCount: 29,
        description: "Heavy-duty doorframe pull-up bar utilizing leverage physics. No drilling required. Allows wide, narrow, and neutral grip training.",
        shortDescription: "Zero-drilling leverage doorway pull-up bar.",
        features: [
            "Zero screws or wall damage leverage design",
            "6 padded grip positions for muscle isolation",
            "Reinforced thick steel tubes hold up to 300 lbs",
            "Sleek design fits standard doorframes easily"
        ],
        specifications: {
            "Material": "Heavy-Gauge Carbon Steel, EVA Foam",
            "Fits Doorframe Widths": "60cm to 85cm",
            "Holds Up To": "136kg (300 lbs)",
            "Bar Weight": "3.8kg",
            "Grip Material": "High-Density Sweatproof EVA Foam",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x Heavy-Duty Frame Assembly",
            "2x Wedge Guard Protectors",
            "1x Hex Bolt Hardware Toolset"
        ],
        variants: ["Standard Leverage"]
    },
    {
        id: "p9",
        name: "Space-Saving Treadmill",
        slug: "space-saving-treadmill",
        category: "PERFORMANCE",
        subcategory: "Cardio",
        price: 850000,
        compareAtPrice: 950000,
        images: {
            primary: "https://images.pexels.com/photos/5411023/pexels-photo-5411023.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/treadmill_detail.svg"
        },
        rating: 4.9,
        reviewCount: 11,
        description: "Ultra-thin, foldable electric treadmill featuring a low-noise motor, digital display, and a smart shock-absorption running deck designed for compact spaces.",
        shortDescription: "Fold-flat silent running cardio deck.",
        features: [
            "Folds 180° flat to roll under sofas or beds",
            "Whisper-quiet 2.25HP brushless motor",
            "Multi-layer impact-absorbing running belt protects knees",
            "LED dashboard tracks speed, distance, time, and calories"
        ],
        specifications: {
            "Motor": "2.25 HP Brushless Silent DC Motor",
            "Speed Range": "1.0 - 12.0 km/h",
            "Running Area": "120cm x 40cm",
            "Max User Weight": "110kg",
            "Folded Height": "13cm",
            "Power Supply": "220V standard plug",
            "Warranty": "1-Year Engine & Frame Warranty"
        },
        includedItems: [
            "1x Space-Saving Folding Treadmill",
            "1x Smart Safety Key",
            "1x Wireless Remote Control",
            "1x Lubricating Oil Tube",
            "1x Toolkit"
        ],
        variants: ["Standard Edition"]
    },
    {
        id: "p10",
        name: "Adjustable Bench V2",
        slug: "adjustable-bench-v2",
        category: "STRENGTH",
        subcategory: "Weights",
        price: 220000,
        compareAtPrice: 260000,
        images: {
            primary: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnA9NFP_ZdbENITN9dp8EQeEU_piVWb8XLdw5XIrB-A&s=10",
            secondary: "assets/bench_detail.svg"
        },
        rating: 4.8,
        reviewCount: 18,
        description: "Heavy-duty workout bench supporting flat, incline, and decline options. Features high-density sweatproof padding and folds completely flat for minimal footprint storage.",
        shortDescription: "Multi-angle fold-flat steel workout bench.",
        features: [
            "7 adjustable backrest angles and 3 seat angles",
            "Thick, high-density vegan leather backrest pad",
            "Sturdy triangular design supports up to 600 lbs",
            "Folds flat in 10 seconds to fit inside closets"
        ],
        specifications: {
            "Material": "Alloy Steel, Premium PU Leather",
            "Capacity": "272kg (600 lbs)",
            "Backrest Angle Settings": "-20° to +85° (7 steps)",
            "Pad Thickness": "6.5cm",
            "Folded Dimensions": "80cm x 35cm x 25cm",
            "Warranty": "1-Year Frame Warranty"
        },
        includedItems: [
            "1x Adjustable Utility Bench Assembly",
            "1x Removable Leg Support Attachment",
            "1x Setup & Care Guide"
        ],
        variants: ["Stealth Edition"]
    },
    {
        id: "p11",
        name: "Barbell & Iron Plates",
        slug: "barbell-iron-plates",
        category: "STRENGTH",
        subcategory: "Weights",
        price: 380000,
        compareAtPrice: 430000,
        images: {
            primary: "https://images.pexels.com/photos/7811528/pexels-photo-7811528.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/barbell_detail.svg"
        },
        rating: 4.9,
        reviewCount: 14,
        description: "Solid Olympic weight bar paired with heavy-duty cast iron plates and secure spring collar locks. The ultimate system for squats, deadlifts, and bench pressing at home.",
        shortDescription: "50kg Olympic barbell and cast-iron plates set.",
        features: [
            "Precision-engineered 6-foot Olympic barbell bar",
            "Secure screw-threaded plates locking pins",
            "Thick cast-iron plate weights hold lifetime durability",
            "Knurled bar grip markings isolate finger slip"
        ],
        specifications: {
            "Material": "Chromed Solid Steel Bar, Cast Iron Plates",
            "Total Weight": "50kg (Bar: 10kg + Plates: 40kg)",
            "Plate Breakdown": "2x 10kg, 2x 5kg, 4x 2.5kg",
            "Bar Length": "180cm (6 Feet)",
            "Bar Load Capacity": "150kg",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x 1.8m Olympic Style Barbell Bar",
            "8x Heavy Cast Iron Weight Plates",
            "2x Secure Spring Collar Locks",
            "1x Barbell Foam Neck Cushion"
        ],
        variants: ["50kg Total Set", "70kg Total Set (+₦60,000)"]
    },
    {
        id: "p12",
        name: "Double Core Sliders",
        slug: "double-core-sliders",
        category: "PERFORMANCE",
        subcategory: "Core",
        price: 12000,
        compareAtPrice: 15000,
        images: {
            primary: "assets/sliders_front.svg",
            secondary: "assets/sliders_detail.svg"
        },
        rating: 4.5,
        reviewCount: 20,
        description: "Double-sided sliding discs designed to glide on carpets or hard floors. Promotes low-impact high-intensity core, glute, and leg training.",
        shortDescription: "Dual-surface smooth gliding core discs.",
        features: [
            "Smooth plastic side for gliding on carpets",
            "Soft cushioned foam side protects hard floors",
            "Extremely lightweight and portable",
            "Perfect for mountain climbers and slide lunges"
        ],
        specifications: {
            "Material": "ABS Plastic, High-Density EVA Foam",
            "Diameter": "17.8cm",
            "Thickness": "1.2cm",
            "Weight": "150g per pair",
            "Compatible Surfaces": "Carpet, Hardwood, Tile, Laminate",
            "Warranty": "6-Month Warranty"
        },
        includedItems: [
            "2x Double-Sided Core Sliders",
            "1x Core Workout Plan Booklet"
        ],
        variants: ["Stealth Black"]
    },
    {
        id: "p13",
        name: "Suspension Trainer Kit",
        slug: "suspension-trainer-kit",
        category: "PERFORMANCE",
        subcategory: "Bodyweight",
        price: 85000,
        compareAtPrice: 100000,
        images: {
            primary: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/suspension_detail.svg"
        },
        rating: 4.8,
        reviewCount: 25,
        description: "Full suspension strap trainer to build power using bodyweight leverage. Sets up in seconds on doors, poles, or beams for complete training anywhere.",
        shortDescription: "Premium bodyweight leverage suspension strap kit.",
        features: [
            "High-tensile military-grade nylon webbing straps",
            "Reinforced steel buckles adjust length quickly",
            "Sweat-resistant textured rubber handles",
            "Integrated non-slip door anchor block"
        ],
        specifications: {
            "Material": "Industrial Nylon, Steel, TPR Rubber",
            "Max Capacity": "180kg (400 lbs)",
            "Strap Length Adjustability": "1.2m to 2.2m",
            "Anchor Types": "Door Anchor, Suspension Anchor, Strap Loop",
            "Weight": "1.1kg",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x Heavy-Duty Suspension Main Straps",
            "1x Secure Door Anchor Cushion",
            "1x Extension Anchor Loop Strap",
            "1x Mesh Travel Bag"
        ],
        variants: ["Standard Pro Kit"]
    },
    {
        id: "p14",
        name: "Elite Boxing Set",
        slug: "elite-boxing-set",
        category: "PERFORMANCE",
        subcategory: "Boxing",
        price: 150000,
        compareAtPrice: 180000,
        images: {
            primary: "https://images.pexels.com/photos/6296105/pexels-photo-6296105.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/boxing_detail.svg"
        },
        rating: 4.7,
        reviewCount: 16,
        description: "Heavy leather punching bag paired with foam-injected boxing gloves and heavy-duty ceiling swivel hanger. Complete boxing setup for conditioning.",
        shortDescription: "Hanging punching bag and leather gloves bundle.",
        features: [
            "High-durability synthetic leather bag resists rips",
            "Shredded textile clean filling absorbs high impact",
            "12oz boxing gloves with triple-density foam protection",
            "Heavy-duty steel ceiling mount and swivel hooks"
        ],
        specifications: {
            "Bag Weight": "30kg",
            "Bag Height": "100cm (4 Feet)",
            "Glove Weight": "12oz",
            "Material": "Synthetic PU Leather, Steel chains",
            "Ceiling Mount": "Four-point Solid Steel Anchor",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x Heavy 30kg Punching Bag (Filled)",
            "1x Pair of 12oz Boxing Gloves",
            "1x Steel Hanging Chain Set",
            "1x Ceiling Anchor Mount & Bolt Screws"
        ],
        variants: ["12oz Gloves + 30kg Bag"]
    },
    {
        id: "p15",
        name: "Premium Medicine Ball",
        slug: "premium-medicine-ball",
        category: "PERFORMANCE",
        subcategory: "Weights",
        price: 55000,
        compareAtPrice: 65000,
        images: {
            primary: "https://images.pexels.com/photos/4720565/pexels-photo-4720565.jpeg?auto=compress&cs=tinysrgb&w=500",
            secondary: "assets/kettlebell_detail.svg"
        },
        rating: 4.8,
        reviewCount: 23,
        description: "Deadweight medicine ball designed to absorb explosive drops and floor slams. Scuff-resistant rubber surface enables active throwing training.",
        shortDescription: "Explosive slam-resistant training medicine ball.",
        features: [
            "Zero-rebound sand-filled center prevents kickbacks",
            "Thick textured rubber shell handles heavy impacts",
            "Textured grid surface pattern for absolute grip",
            "Stops rolling immediately upon landing"
        ],
        specifications: {
            "Material": "Thick PVC, Iron Sand Fill",
            "Weight": "8kg",
            "Diameter": "23cm",
            "Rebound Rating": "Zero Bounce",
            "Color": "Stealth Black",
            "Warranty": "1-Year Warranty"
        },
        includedItems: [
            "1x 8kg Slam Medicine Ball",
            "1x Power Slam Workout Manual"
        ],
        variants: ["8kg Ball", "12kg Ball (+₦18,000)"]
    }
];

// ==========================================================================
// SHOPPING CART CONTROLLER
// ==========================================================================

class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('ay_cart_items')) || [];
        this.bagCountEl = document.querySelector('.bag-count');
        this.bagDrawerEl = document.getElementById('bag-drawer');
        this.drawerItemsEl = document.getElementById('bag-items-list');
        this.subtotalAmountEl = document.getElementById('bag-subtotal-amount');
        this.bagTotalEl = document.getElementById('bag-total-amount');
        this.overlayEl = document.getElementById('drawer-overlay');
        this.bagToggleBtn = document.getElementById('bag-toggle');
        this.closeBagBtn = document.getElementById('close-bag');
        
        this.init();
    }

    init() {
        // Toggle drawer
        this.bagToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.openDrawer();
        });
        this.closeBagBtn.addEventListener('click', () => this.closeDrawer());
        this.overlayEl.addEventListener('click', () => this.closeDrawer());

        // Dynamic checkout drawer click
        const drawerCheckout = document.getElementById('drawer-checkout-btn');
        if (drawerCheckout) {
            drawerCheckout.addEventListener('click', () => {
                this.closeDrawer();
                window.location.hash = '#/checkout';
            });
        }

        this.updateCartUI();
    }

    openDrawer() {
        this.bagDrawerEl.classList.add('open');
        this.overlayEl.classList.add('active');
    }

    closeDrawer() {
        this.bagDrawerEl.classList.remove('open');
        this.overlayEl.classList.remove('active');
    }

    saveCart() {
        localStorage.setItem('ay_cart_items', JSON.stringify(this.items));
    }

    addItem(name, price, image = 'Dumbbell.jpg', variant = 'Standard', quantity = 1, slug = '') {
        const existingIdx = this.items.findIndex(item => item.name === name && item.variant === variant);
        if (existingIdx > -1) {
            this.items[existingIdx].quantity += quantity;
        } else {
            this.items.push({ name, price, image, variant, quantity, slug });
        }
        this.saveCart();
        this.updateCartUI();
        this.showToast(`Added ${name} (${variant}) to your bag.`);
    }

    removeItem(index) {
        const item = this.items[index];
        this.items.splice(index, 1);
        this.saveCart();
        this.updateCartUI();
        if (item) {
            this.showToast(`Removed ${item.name} from bag.`);
        }
        // Force refresh checkout summary if we are on checkout page
        if (window.location.hash === '#/checkout') {
            updateCheckoutSummary();
        }
    }

    updateQuantity(index, newQty) {
        if (newQty <= 0) {
            this.removeItem(index);
            return;
        }
        this.items[index].quantity = newQty;
        this.saveCart();
        this.updateCartUI();
        // Force refresh checkout summary if we are on checkout page
        if (window.location.hash === '#/checkout') {
            updateCheckoutSummary();
        }
    }

    showToast(message) {
        const toast = document.getElementById('notification-toast');
        const toastMsg = document.getElementById('notification-toast-message');
        if (toast && toastMsg) {
            toastMsg.textContent = message;
            toast.classList.add('active');
            setTimeout(() => {
                toast.classList.remove('active');
            }, 3000);
        }
    }

    updateCartUI() {
        // Count totals
        const totalItemsCount = this.items.reduce((acc, curr) => acc + curr.quantity, 0);
        this.bagCountEl.textContent = totalItemsCount;

        // Clear drawer container
        this.drawerItemsEl.innerHTML = '';

        if (this.items.length === 0) {
            this.drawerItemsEl.innerHTML = '<div class="empty-bag-message">Your bag is empty. Explore hardware to get started.</div>';
            this.subtotalAmountEl.textContent = '₦0';
            this.bagTotalEl.textContent = '₦0';
            return;
        }

        let subtotal = 0;
        this.items.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-product-row">
                    <div class="cart-item-image-wrapper">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.name}</span>
                        <span style="font-size: 11px; color: var(--text-muted);">${item.variant}</span>
                        <span class="cart-item-price" style="margin-top: 4px; color: var(--text-pure); font-weight: 600;">₦${(item.price).toLocaleString()}</span>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="qty-control-cart">
                        <button class="qty-dec-btn" data-index="${index}">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-inc-btn" data-index="${index}">+</button>
                    </div>
                    <button class="remove-item-btn" data-index="${index}" style="margin-left: 8px;">×</button>
                </div>
            `;
            this.drawerItemsEl.appendChild(itemEl);
        });

        this.subtotalAmountEl.textContent = `₦${subtotal.toLocaleString()}`;
        this.bagTotalEl.textContent = `₦${subtotal.toLocaleString()}`;

        // Bind Inc/Dec events
        this.drawerItemsEl.querySelectorAll('.qty-dec-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                this.updateQuantity(idx, this.items[idx].quantity - 1);
            });
        });

        this.drawerItemsEl.querySelectorAll('.qty-inc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                this.updateQuantity(idx, this.items[idx].quantity + 1);
            });
        });

        this.drawerItemsEl.querySelectorAll('.remove-item-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                this.removeItem(idx);
            });
        });
    }
}

// Global Cart Handle
let Cart;

// ==========================================================================
// RENDER DYNAMIC PRODUCTS
// ==========================================================================

function renderProductsGrid(category = 'ALL') {
    const container = document.getElementById('dynamic-product-grid');
    if (!container) return;

    container.innerHTML = '';
    const filteredProducts = category === 'ALL' 
        ? PRODUCT_DATABASE 
        : PRODUCT_DATABASE.filter(p => p.category === category);

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card reveal-item revealed';
        card.setAttribute('data-tilt', '');
        
        card.innerHTML = `
            <div class="product-card-inner">
                <div class="card-image-container">
                    <img src="${product.images.primary}" alt="${product.name}" class="product-image active" data-view="primary" loading="lazy" decoding="async">
                    <img src="${product.images.secondary}" alt="${product.name} Detail" class="product-image" data-view="secondary" loading="lazy" decoding="async">
                </div>
                <div class="view-toggles">
                    <button class="toggle-btn active" data-target="primary">Front</button>
                    <button class="toggle-btn" data-target="secondary">Detail</button>
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-cat">${product.subcategory}</span>
                        <span class="product-price">₦${product.price.toLocaleString()}</span>
                    </div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${product.shortDescription || product.description}</p>
                    <div style="display: flex; gap: 8px; margin-top: auto;">
                        <button class="add-to-bag-btn card-add-bag" data-id="${product.id}" style="flex: 1;">Add to Bag</button>
                        <a href="#/product/${product.slug}" class="add-to-bag-btn" style="flex: 1; text-align: center; text-decoration: none; background-color: transparent; border: 1.5px solid var(--border-glass); color: var(--text-pure); display: flex; align-items: center; justify-content: center; font-size: 11px;">View Details</a>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // Reinitialize toggles & tilt effects for dynamically added elements
    initProductCardToggles(container);
    initTiltForElement(container);
}

function initProductCardToggles(parentElement = document) {
    parentElement.querySelectorAll('.card-image-container').forEach(container => {
        const parent = container.parentElement;
        const toggleButtons = parent.querySelectorAll('.view-toggles .toggle-btn');
        const images = container.querySelectorAll('.product-image');

        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const targetView = btn.getAttribute('data-target');

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

    // Card Add to Bag clicks
    parentElement.querySelectorAll('.card-add-bag').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const prod = PRODUCT_DATABASE.find(p => p.id === id);
            if (prod) {
                Cart.addItem(prod.name, prod.price, prod.images.primary, 'Standard', 1, prod.slug);
            }
        });
    });
}

function initTiltForElement(parentElement) {
    if (window.matchMedia('(hover: hover)').matches) {
        parentElement.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const xc = rect.width / 2;
                const yc = rect.height / 2;

                const tiltX = (yc - y) / 15;
                const tiltY = (x - xc) / 15;

                const target = card.querySelector('.product-card-inner') || card;
                target.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                const target = card.querySelector('.product-card-inner') || card;
                target.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                target.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            });
        });
    }
}

// ==========================================================================
// CLIENT-SIDE ROUTER & VIEW CONTROLLER
// ==========================================================================

function handleHashRouting() {
    const hash = window.location.hash || '#/';
    
    // Select our views
    const homeView = document.getElementById('home-view');
    const productDetailView = document.getElementById('product-detail-view');
    const checkoutView = document.getElementById('checkout-view');
    const policyView = document.getElementById('policy-view');

    // Scroll to top on navigation
    window.scrollTo(0, 0);

    // Hide all views
    [homeView, productDetailView, checkoutView, policyView].forEach(v => {
        if (v) v.classList.add('hidden');
    });

    // 1. Home route
    if (hash === '#/' || hash === '' || hash.startsWith('#/story')) {
        homeView.classList.remove('hidden');
        
        if (hash === '#/story') {
            setTimeout(() => {
                const el = document.getElementById('story-narrative');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
        document.title = "Athletic You | Workout Simplified - Premium Nigerian Home Gym Hardware";
    } 
    // 2. Product Detail route
    else if (hash.startsWith('#/product/')) {
        const slug = hash.replace('#/product/', '');
        const product = PRODUCT_DATABASE.find(p => p.slug === slug);
        
        if (product) {
            productDetailView.classList.remove('hidden');
            renderProductDetailPage(product);
            document.title = `${product.name} | Athletic You Nigeria`;
        } else {
            window.location.hash = '#/';
        }
    } 
    // 3. Checkout route
    else if (hash === '#/checkout') {
        checkoutView.classList.remove('hidden');
        renderCheckoutPage();
        document.title = "Secure Checkout | Athletic You Nigeria";
    } 
    // 4. Static policies
    else if (hash === '#/shipping-delivery' || hash === '#/returns' || hash === '#/warranty' || hash === '#/contact') {
        policyView.classList.remove('hidden');
        renderPolicyPage(hash);
    }
}

// Render dynamic detail template
function renderProductDetailPage(product) {
    const view = document.getElementById('product-detail-view');
    if (!view) return;

    const ratingStars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
    
    const specsHTML = Object.keys(product.specifications).map(key => `
        <tr>
            <td>${key}</td>
            <td>${product.specifications[key]}</td>
        </tr>
    `).join('');

    const includedHTML = product.includedItems.map(item => `<li>${item}</li>`).join('');
    const featuresHTML = product.features.map(f => `<li>${f}</li>`).join('');
    const variantsHTML = product.variants.map((v, i) => `
        <button class="variant-btn ${i === 0 ? 'active' : ''}" data-val="${v}">${v}</button>
    `).join('');

    view.innerHTML = `
        <div class="product-breadcrumbs">
            <a href="#/" style="color: var(--text-muted); text-decoration: none;">Shop</a> / 
            <span style="color: var(--text-muted);">${product.category}</span> / 
            <span style="color: var(--text-pure);">${product.name}</span>
        </div>
        
        <div class="product-detail-grid">
            <!-- Gallery Block -->
            <div class="gallery-container">
                <div class="main-image-viewport">
                    <img id="detail-main-img" src="${product.images.primary}" alt="${product.name}">
                </div>
                <div class="thumbnail-strip">
                    <button class="thumb-btn active" data-src="${product.images.primary}">
                        <img src="${product.images.primary}" alt="Primary View">
                    </button>
                    <button class="thumb-btn" data-src="${product.images.secondary}">
                        <img src="${product.images.secondary}" alt="Technical View">
                    </button>
                </div>
            </div>
            
            <!-- Info Block -->
            <div class="info-section">
                <h1 class="detail-title">${product.name}</h1>
                <p class="detail-tagline">Build your home setup with serious gym-grade hardware.</p>
                
                <div class="detail-ratings-row">
                    <span class="detail-stars">${ratingStars}</span>
                    <span class="detail-reviews-count">${product.rating} / 5.0 (${product.reviewCount} verified reviews)</span>
                    <span class="detail-stock-badge">In Stock - Ships Tomorrow</span>
                </div>
                
                <div class="detail-price-row">
                    <span class="detail-current-price">₦${product.price.toLocaleString()}</span>
                    ${product.compareAtPrice ? `<span class="detail-original-price">₦${product.compareAtPrice.toLocaleString()}</span>` : ''}
                </div>
                
                <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.6; margin-bottom: 32px;">${product.description}</p>
                
                <!-- Variant Selector -->
                <div class="detail-variants">
                    <div class="variant-title">Select configuration</div>
                    <div class="variant-options">
                        ${variantsHTML}
                    </div>
                </div>
                
                <!-- Buy Controls -->
                <div class="purchase-controls">
                    <div class="qty-selector">
                        <button id="detail-qty-dec">-</button>
                        <span id="detail-qty-val">1</span>
                        <button id="detail-qty-inc">+</button>
                    </div>
                    <button class="add-bag-detail-btn" id="detail-add-bag">ADD TO BAG</button>
                    <button class="buy-now-detail-btn" id="detail-buy-now">BUY NOW</button>
                </div>
                
                <!-- Accordions specs -->
                <div class="detail-accordions">
                    <div class="accordion-item active">
                        <button class="accordion-trigger">
                            WHY YOU'LL LIKE IT
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div class="accordion-content" style="max-height: 300px;">
                            <div class="accordion-content-inner">
                                <ul>
                                    ${featuresHTML}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <button class="accordion-trigger">
                            SPECIFICATIONS
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <table class="specs-table">
                                    ${specsHTML}
                                </table>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <button class="accordion-trigger">
                            WHAT'S INCLUDED IN THE PACKAGE
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <ul>
                                    ${includedHTML}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="accordion-item">
                        <button class="accordion-trigger">
                            NIGERIAN DELIVERY & RETURNS
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                        </button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                <p><strong>Lagos State Delivery:</strong> Priority delivery takes 1-2 business days. Shipping rates are calculated flat during checkout.<br><br><strong>Nationwide Nigerian Delivery:</strong> Shipping to Abuja, Port Harcourt, Enugu, Ibadan, and other states takes 3-5 business days.<br><br><strong>Return Guarantee:</strong> We offer a 14-day hassle-free return policy for any unused products returned in their original packaging.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Gallery switching handlers
    view.querySelectorAll('.thumb-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetBtn = e.currentTarget;
            view.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
            targetBtn.classList.add('active');
            
            const targetSrc = targetBtn.getAttribute('data-src');
            const mainImg = document.getElementById('detail-main-img');
            if (mainImg) mainImg.src = targetSrc;
        });
    });

    // Accordion click handlers
    view.querySelectorAll('.accordion-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const item = e.currentTarget.parentElement;
            const content = item.querySelector('.accordion-content');
            
            const isCurrentlyActive = item.classList.contains('active');
            
            view.querySelectorAll('.accordion-item').forEach(it => {
                it.classList.remove('active');
                it.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isCurrentlyActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Qty adjustments
    let qty = 1;
    const qtyValEl = document.getElementById('detail-qty-val');
    document.getElementById('detail-qty-dec').addEventListener('click', () => {
        if (qty > 1) {
            qty--;
            qtyValEl.textContent = qty;
        }
    });
    document.getElementById('detail-qty-inc').addEventListener('click', () => {
        qty++;
        qtyValEl.textContent = qty;
    });

    // Selected variant
    let selectedVariant = product.variants[0];
    view.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            view.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            selectedVariant = e.currentTarget.getAttribute('data-val');
        });
    });

    // Add to Cart
    document.getElementById('detail-add-bag').addEventListener('click', () => {
        Cart.addItem(product.name, product.price, product.images.primary, selectedVariant, qty, product.slug);
    });

    // Buy Now
    document.getElementById('detail-buy-now').addEventListener('click', () => {
        Cart.addItem(product.name, product.price, product.images.primary, selectedVariant, qty, product.slug);
        window.location.hash = '#/checkout';
    });
}

// Render dynamic checkout flow template
function renderCheckoutPage() {
    const view = document.getElementById('checkout-view');
    if (!view) return;

    if (Cart.items.length === 0) {
        view.innerHTML = `
            <div style="text-align: center; padding: 60px 0;">
                <h2 style="font-family: var(--font-heading); margin-bottom: 20px;">Your shopping bag is empty.</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">Add items to your bag to complete checkout.</p>
                <a href="#/" class="cta-btn">Back to Shop</a>
            </div>
        `;
        return;
    }

    view.innerHTML = `
        <div class="checkout-steps-nav">
            <div class="step-indicator active" id="step-indicator-1">
                <div class="step-number">1</div>
                <div class="step-label">Contact</div>
            </div>
            <div class="step-indicator" id="step-indicator-2">
                <div class="step-number">2</div>
                <div class="step-label">Delivery</div>
            </div>
            <div class="step-indicator" id="step-indicator-3">
                <div class="step-number">3</div>
                <div class="step-label">Review</div>
            </div>
            <div class="step-indicator" id="step-indicator-4">
                <div class="step-number">4</div>
                <div class="step-label">Payment</div>
            </div>
            <div class="step-indicator" id="step-indicator-5">
                <div class="step-number">5</div>
                <div class="step-label">Confirm</div>
            </div>
        </div>

        <div class="checkout-grid">
            <!-- Left Side Forms -->
            <div class="checkout-form-container">
                <!-- STEP 1: CONTACT -->
                <div class="checkout-step-panel active" id="checkout-panel-1">
                    <h3>Contact Information</h3>
                    <div class="form-group">
                        <label for="checkout-name">Full Name</label>
                        <input type="text" id="checkout-name" class="form-input" placeholder="e.g. Chukwuma Awolowo" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-email">Email Address</label>
                        <input type="email" id="checkout-email" class="form-input" placeholder="e.g. name@gmail.com" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-phone">Phone Number (WhatsApp Preferred)</label>
                        <input type="tel" id="checkout-phone" class="form-input" placeholder="e.g. +234 803 123 4567" required>
                    </div>
                    <div class="form-actions">
                        <div></div>
                        <button class="form-btn-primary" id="btn-goto-step-2">Continue to Delivery</button>
                    </div>
                </div>

                <!-- STEP 2: DELIVERY -->
                <div class="checkout-step-panel" id="checkout-panel-2">
                    <h3>Delivery Details</h3>
                    <div class="form-group">
                        <label for="checkout-state">State</label>
                        <select id="checkout-state" class="form-input" style="background-color: #0b0b0c;" required>
                            <option value="">Select your state...</option>
                            <option value="Lagos">Lagos State (₦3,500 Delivery)</option>
                            <option value="Abuja">Abuja FCT (₦7,500 Delivery)</option>
                            <option value="Rivers">Rivers State (₦7,500 Delivery)</option>
                            <option value="Oyo">Oyo State (₦7,500 Delivery)</option>
                            <option value="Anambra">Anambra State (₦7,500 Delivery)</option>
                            <option value="Kano">Kano State (₦7,500 Delivery)</option>
                            <option value="Edo">Edo State (₦7,500 Delivery)</option>
                            <option value="Delta">Delta State (₦7,500 Delivery)</option>
                            <option value="Other">Other States (₦7,500 Delivery)</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="checkout-city">City</label>
                            <input type="text" id="checkout-city" class="form-input" placeholder="e.g. Ikeja or Wuse 2" required>
                        </div>
                        <div class="form-group">
                            <label for="checkout-postal">Postal Code (Optional)</label>
                            <input type="text" id="checkout-postal" class="form-input" placeholder="100001">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="checkout-address">Delivery Street Address</label>
                        <input type="text" id="checkout-address" class="form-input" placeholder="e.g. 12 Joel Ogunnaike Street" required>
                    </div>
                    <div class="form-group">
                        <label for="checkout-notes">Special Delivery Instructions (Optional)</label>
                        <textarea id="checkout-notes" class="form-input" style="height: 80px;" placeholder="e.g. Ring doorbell, call before arriving, deliver to estate gate reception."></textarea>
                    </div>
                    <div class="form-actions">
                        <button class="form-btn-secondary" id="btn-backto-step-1">Back</button>
                        <button class="form-btn-primary" id="btn-goto-step-3">Continue to Review</button>
                    </div>
                </div>

                <!-- STEP 3: REVIEW -->
                <div class="checkout-step-panel" id="checkout-panel-3">
                    <h3>Review Your Order</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">Please review your contact and shipping information before proceeding to payment.</p>
                    
                    <div style="background-color: rgba(0,0,0,0.2); border: 1px solid var(--border-glass); border-radius: 16px; padding: 20px; margin-bottom: 28px;">
                        <h4 style="font-size: 14px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-purple-light);">Shipping Information</h4>
                        <p id="review-shipping-details" style="font-size: 13.5px; line-height: 1.6; color: var(--text-pure);"></p>
                    </div>

                    <div style="background-color: rgba(0,0,0,0.2); border: 1px solid var(--border-glass); border-radius: 16px; padding: 20px; margin-bottom: 28px;">
                        <h4 style="font-size: 14px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--accent-purple-light);">Contact Information</h4>
                        <p id="review-contact-details" style="font-size: 13.5px; line-height: 1.6; color: var(--text-pure);"></p>
                    </div>

                    <div class="form-actions">
                        <button class="form-btn-secondary" id="btn-backto-step-2">Back</button>
                        <button class="form-btn-primary" id="btn-goto-step-4">Proceed to Payment</button>
                    </div>
                </div>

                <!-- STEP 4: PAYMENT -->
                <div class="checkout-step-panel" id="checkout-panel-4">
                    <h3>Secure Payment Options</h3>
                    <p style="color: var(--text-muted); font-size: 14px; margin-bottom: 24px;">Select your preferred payment method. Powered by secure Nigerian payment gateways.</p>
                    
                    <div class="payment-methods-grid">
                        <label class="payment-method-option active" id="pay-opt-paystack">
                            <input type="radio" name="paymethod" value="Paystack" checked>
                            <div style="text-align: left;">
                                <span style="font-weight: 600; display: block; font-size: 14px;">Paystack Secure Channel</span>
                                <span style="font-size: 11.5px; color: var(--text-muted);">Pay securely via Cards, Bank Transfer, USSD, or Barter.</span>
                            </div>
                            <span class="paystack-sim-badge">Paystack</span>
                        </label>
                        <label class="payment-method-option" id="pay-opt-transfer">
                            <input type="radio" name="paymethod" value="Transfer">
                            <div style="text-align: left;">
                                <span style="font-weight: 600; display: block; font-size: 14px;">Direct Bank Transfer (Manual Verification)</span>
                                <span style="font-size: 11.5px; color: var(--text-muted);">Transfer to our GTBank/Wema business account directly.</span>
                            </div>
                        </label>
                    </div>

                    <!-- Direct Transfer Details (Conditional display) -->
                    <div id="direct-transfer-instructions" class="hidden" style="background-color: rgba(255,255,255,0.02); border: 1px solid var(--border-glass); padding: 20px; border-radius: 16px; margin-bottom: 28px; font-size: 13px; line-height: 1.6;">
                        <h4 style="margin-bottom: 8px; color: var(--text-pure);">Bank Account Details</h4>
                        <p>Bank Name: <strong>GTBank (Guaranty Trust Bank)</strong><br>
                        Account Name: <strong>Athletic You Ventures Ltd</strong><br>
                        Account Number: <strong>0612984719</strong><br><br>
                        <em>Note: Please include your Order Number as transfer description. Orders will be processed immediately after verification.</em></p>
                    </div>

                    <div class="form-actions">
                        <button class="form-btn-secondary" id="btn-backto-step-3">Back</button>
                        <button class="form-btn-primary" id="btn-submit-order" style="background-color: #30D158; color: #fff;">COMPLETE ORDER (₦<span id="final-btn-amount">0</span>)</button>
                    </div>
                </div>

                <!-- STEP 5: CONFIRMATION -->
                <div class="checkout-step-panel" id="checkout-panel-5">
                    <div class="success-panel">
                        <div class="success-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h2>ORDER CONFIRMED</h2>
                        <p class="success-desc">Thank you for shopping with Athletic You. Your order request has been logged successfully. We have sent a copy of your receipt to your email address.</p>
                        
                        <div class="receipt-details" id="receipt-details-panel">
                            <!-- Populated dynamically -->
                        </div>

                        <a id="whatsapp-confirm-link" href="#" target="_blank" class="success-whatsapp-btn">
                            <svg viewBox="0 0 24 24">
                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.535 0 10.026-4.488 10.029-10.022.002-2.68-1.037-5.197-2.927-7.09C16.537 1.6 14.04 .563 11.36.563 5.823.563 1.33 5.05 1.328 10.584c-.001 1.649.462 3.255 1.336 4.67l-.98 3.57 3.667-.96.096.057z"/>
                            </svg>
                            VERIFY ORDER VIA WHATSAPP
                        </a>
                    </div>
                </div>
            </div>

            <!-- Right Side Cart Summary -->
            <div class="checkout-summary-card" id="checkout-summary-card">
                <h3>Order Summary</h3>
                <div class="summary-items-list" id="checkout-summary-items">
                    <!-- Populated dynamically -->
                </div>
                <div class="summary-rows">
                    <div class="summary-row">
                        <span>Items Subtotal:</span>
                        <span id="chk-subtotal">₦0</span>
                    </div>
                    <div class="summary-row">
                        <span>Delivery Fee:</span>
                        <span id="chk-shipping">₦0</span>
                    </div>
                    <div class="summary-row">
                        <span>Est. Taxes:</span>
                        <span>₦0</span>
                    </div>
                    <div class="summary-row total">
                        <span>Grand Total:</span>
                        <span id="chk-grand-total">₦0</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Local Checkout variables state
    let customerName = '';
    let customerEmail = '';
    let customerPhone = '';
    let shippingState = '';
    let shippingCity = '';
    let shippingAddress = '';
    let deliveryInstructions = '';
    let paymentMethod = 'Paystack';

    const stepIndicators = {
        1: document.getElementById('step-indicator-1'),
        2: document.getElementById('step-indicator-2'),
        3: document.getElementById('step-indicator-3'),
        4: document.getElementById('step-indicator-4'),
        5: document.getElementById('step-indicator-5')
    };

    const stepPanels = {
        1: document.getElementById('checkout-panel-1'),
        2: document.getElementById('checkout-panel-2'),
        3: document.getElementById('checkout-panel-3'),
        4: document.getElementById('checkout-panel-4'),
        5: document.getElementById('checkout-panel-5')
    };

    function changeStep(newStep) {
        Object.keys(stepPanels).forEach(key => {
            stepPanels[key].classList.remove('active');
            stepIndicators[key].classList.remove('active');
            if (parseInt(key) < newStep) {
                stepIndicators[key].classList.add('completed');
            } else {
                stepIndicators[key].classList.remove('completed');
            }
        });
        stepPanels[newStep].classList.add('active');
        stepIndicators[newStep].classList.add('active');
    }

    document.getElementById('btn-goto-step-2').addEventListener('click', () => {
        customerName = document.getElementById('checkout-name').value.trim();
        customerEmail = document.getElementById('checkout-email').value.trim();
        customerPhone = document.getElementById('checkout-phone').value.trim();

        if (!customerName || !customerEmail || !customerPhone) {
            alert('Please fill out all contact details to proceed.');
            return;
        }
        changeStep(2);
    });

    document.getElementById('btn-backto-step-1').addEventListener('click', () => {
        changeStep(1);
    });

    document.getElementById('btn-goto-step-3').addEventListener('click', () => {
        shippingState = document.getElementById('checkout-state').value;
        shippingCity = document.getElementById('checkout-city').value.trim();
        shippingAddress = document.getElementById('checkout-address').value.trim();
        deliveryInstructions = document.getElementById('checkout-notes').value.trim();

        if (!shippingState || !shippingCity || !shippingAddress) {
            alert('Please fill out all delivery address fields to proceed.');
            return;
        }

        updateCheckoutSummary();

        document.getElementById('review-shipping-details').innerHTML = `
            <strong>Address:</strong> ${shippingAddress}, ${shippingCity}, ${shippingState} State.<br>
            <strong>Special Instructions:</strong> ${deliveryInstructions || 'None'}
        `;
        document.getElementById('review-contact-details').innerHTML = `
            <strong>Name:</strong> ${customerName}<br>
            <strong>Email:</strong> ${customerEmail}<br>
            <strong>Phone:</strong> ${customerPhone}
        `;

        changeStep(3);
    });

    document.getElementById('btn-backto-step-2').addEventListener('click', () => {
        changeStep(2);
    });

    document.getElementById('btn-goto-step-4').addEventListener('click', () => {
        const totals = getCartTotals();
        document.getElementById('final-btn-amount').textContent = totals.grandTotal.toLocaleString();
        changeStep(4);
    });

    const paystackOpt = document.getElementById('pay-opt-paystack');
    const transferOpt = document.getElementById('pay-opt-transfer');
    const transferInstructions = document.getElementById('direct-transfer-instructions');

    paystackOpt.addEventListener('click', () => {
        paystackOpt.classList.add('active');
        transferOpt.classList.remove('active');
        transferInstructions.classList.add('hidden');
        paymentMethod = 'Paystack';
    });

    transferOpt.addEventListener('click', () => {
        transferOpt.classList.add('active');
        paystackOpt.classList.remove('active');
        transferInstructions.classList.remove('hidden');
        paymentMethod = 'Bank Transfer';
    });

    document.getElementById('btn-backto-step-3').addEventListener('click', () => {
        changeStep(3);
    });

    document.getElementById('btn-submit-order').addEventListener('click', () => {
        const orderNumber = "AY-" + Math.floor(100000 + Math.random() * 900000);
        const orderTotals = getCartTotals();
        const dateStr = new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });

        const receiptPanel = document.getElementById('receipt-details-panel');
        receiptPanel.innerHTML = `
            <div class="receipt-row">
                <span class="receipt-label">Order Number</span>
                <span class="receipt-value" style="color: var(--accent-purple-light); font-weight: 700;">${orderNumber}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Order Date</span>
                <span class="receipt-value">${dateStr}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Customer Name</span>
                <span class="receipt-value">${customerName}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Delivery Destination</span>
                <span class="receipt-value">${shippingCity}, ${shippingState}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Delivery Timeline</span>
                <span class="receipt-value" style="color: #30D158;">${shippingState === 'Lagos' ? '1-2 Business Days' : '3-5 Business Days'}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Payment Method</span>
                <span class="receipt-value">${paymentMethod}</span>
            </div>
            <div class="receipt-row" style="border-top: 1px solid var(--border-glass); padding-top: 12px; margin-top: 4px; font-size: 16px;">
                <span class="receipt-label" style="color: var(--text-pure); font-weight: 700;">Total Paid</span>
                <span class="receipt-value" style="color: var(--text-pure); font-weight: 700;">₦${orderTotals.grandTotal.toLocaleString()}</span>
            </div>
        `;

        let message = `*Athletic You — Order Verification Request*\n\n`;
        message += `• *Order Number:* ${orderNumber}\n`;
        message += `• *Customer:* ${customerName}\n`;
        message += `• *Phone:* ${customerPhone}\n`;
        message += `• *Delivery Address:* ${shippingAddress}, ${shippingCity}, ${shippingState} State\n`;
        message += `• *Payment Method:* ${paymentMethod}\n\n`;
        message += `*Items ordered:*\n`;
        Cart.items.forEach(item => {
            message += `- ${item.name} (${item.variant}) x${item.quantity} — ₦${(item.price * item.quantity).toLocaleString()}\n`;
        });
        message += `\n*Grand Total:* ₦${orderTotals.grandTotal.toLocaleString()}\n\n`;
        message += `Please confirm my order payment status. Thanks!`;

        const phoneNumber = '2348126708708';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        document.getElementById('whatsapp-confirm-link').href = whatsappUrl;

        const summaryCard = document.getElementById('checkout-summary-card');
        if (summaryCard) summaryCard.style.display = 'none';

        Cart.items = [];
        Cart.saveCart();
        Cart.updateCartUI();

        changeStep(5);
    });

    updateCheckoutSummary();
}

function getCartTotals() {
    const subtotal = Cart.items.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    
    const stateEl = document.getElementById('checkout-state');
    const selectedState = stateEl ? stateEl.value : '';
    
    let shipping = 0;
    if (subtotal > 0) {
        shipping = selectedState === 'Lagos' ? 3500 : 7500;
    }
    
    const grandTotal = subtotal + shipping;
    return { subtotal, shipping, grandTotal };
}

function updateCheckoutSummary() {
    const itemsContainer = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('chk-subtotal');
    const shippingEl = document.getElementById('chk-shipping');
    const grandTotalEl = document.getElementById('chk-grand-total');

    if (!itemsContainer) return;

    itemsContainer.innerHTML = '';
    
    Cart.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'summary-item';
        row.innerHTML = `
            <div>
                <span class="summary-item-name">${item.name}</span>
                <span class="summary-item-qty">x${item.quantity}</span>
                <div style="font-size: 11px; color: var(--text-muted);">${item.variant}</div>
            </div>
            <span class="summary-item-price">₦${(item.price * item.quantity).toLocaleString()}</span>
        `;
        itemsContainer.appendChild(row);
    });

    const totals = getCartTotals();
    subtotalEl.textContent = `₦${totals.subtotal.toLocaleString()}`;
    shippingEl.textContent = totals.shipping > 0 ? `₦${totals.shipping.toLocaleString()}` : '₦0';
    grandTotalEl.textContent = `₦${totals.grandTotal.toLocaleString()}`;
}

// Render dynamic static policy content
function renderPolicyPage(hash) {
    const view = document.getElementById('policy-view');
    if (!view) return;

    if (hash === '#/shipping-delivery') {
        view.innerHTML = `
            <div class="policy-header">
                <h1>Shipping & Delivery Information</h1>
                <p style="color: var(--text-muted); margin-top: 8px;">How delivery works for your Athletic You orders across Nigeria.</p>
            </div>
            <div class="policy-content">
                <h2>Priority Lagos Delivery</h2>
                <p>We offer fast delivery straight to your doorstep within Lagos State. All Lagos orders are processed within 24 hours of confirmation.</p>
                <ul>
                    <li><strong>Delivery Timeline:</strong> 1-2 business days from order placement.</li>
                    <li><strong>Lagos Rate:</strong> Flat rate of ₦3,500 for home gym hardware.</li>
                    <li><strong>Urgent/Same Day:</strong> Available on demand, call or WhatsApp customer support to organize dispatch.</li>
                </ul>

                <h2>Nationwide Shipping Outside Lagos</h2>
                <p>We deliver physical training hardware to Abuja, Port Harcourt, Enugu, Owerri, Ibadan, Abeokuta, Kano, Kaduna, and other states in Nigeria.</p>
                <ul>
                    <li><strong>Delivery Timeline:</strong> 3-5 business days depending on specific destination cities.</li>
                    <li><strong>Other States Rate:</strong> Flat rate of ₦7,500.</li>
                    <li><strong>Courier Partners:</strong> Shipped via trackable vehicle parcel dispatches to guarantee heavy metal parts arrive safely.</li>
                </ul>

                <h2>What Happens After I Order?</h2>
                <p>Once you place your order, your receipt is registered. We highly recommend completing the WhatsApp Verification step immediately. Once your transfer or gateway payment is verified, we secure packaging, assign dispatches, and send your tracking coordinates directly via SMS/Email.</p>
            </div>
        `;
        document.title = "Shipping & Delivery | Athletic You Nigeria";
    } else if (hash === '#/returns') {
        view.innerHTML = `
            <div class="policy-header">
                <h1>Returns & Refunds Policy</h1>
                <p style="color: var(--text-muted); margin-top: 8px;">Our 14-day return and exchange guidelines for peace-of-mind shopping.</p>
            </div>
            <div class="policy-content">
                <h2>14-Day Return Window</h2>
                <p>We stand by the quality of our physical workout hardware. If you change your mind, you can return your items within 14 days of delivery for a full refund or direct exchange.</p>
                
                <h2>Return Conditions</h2>
                <p>To be eligible for returns or refunds, the following conditions must be met:</p>
                <ul>
                    <li>Equipment must be completely unused, unmounted, and in the same pristine condition you received it.</li>
                    <li>Must be returned in the original, undamaged branded packing boxes.</li>
                    <li>Proof of purchase (receipt or order number) must be provided.</li>
                </ul>

                <h2>How to Start a Return</h2>
                <p>Please email our support desk at <strong>support@athleticyou.com</strong> with your order number, or contact us directly on WhatsApp support channels. We will arrange pickup in Lagos (standard pickup fees apply) or coordinate dropoff points.</p>
            </div>
        `;
        document.title = "Returns & Refunds | Athletic You Nigeria";
    } else if (hash === '#/warranty') {
        view.innerHTML = `
            <div class="policy-header">
                <h1>Warranty Policy</h1>
                <p style="color: var(--text-muted); margin-top: 8px;">Our 1-year product warranty coverage and registry guidelines.</p>
            </div>
            <div class="policy-content">
                <h2>1-Year Structural Steel Warranty</h2>
                <p>All Athletic You structural home gym hardware (such as Dumbbells, Kettlebells, Adjustable Bench structural welds, and Doorframe Pull-up bars) automatically include an absolute 1-year product warranty covering structural welds, cracks, and structural steel breakdowns.</p>
                
                <h2>What is Covered</h2>
                <ul>
                    <li>Severe steel metal structure fractures under normal usage specifications.</li>
                    <li>Structural joint weld snaps or breaks.</li>
                    <li>Product assembly component manufacturing failures.</li>
                </ul>

                <h2>What is Excluded</h2>
                <ul>
                    <li>Normal cosmetics scratches, scuffs, paint peels, or leather tears from standard training drops.</li>
                    <li>Water logging damage or rust resulting from outdoor storage.</li>
                    <li>Modifications or custom hardware amendments.</li>
                </ul>

                <h2>How to Lodge a Warranty Claim</h2>
                <p>Email a short description along with photo/video proof of the failure to <strong>support@athleticyou.com</strong> or your WhatsApp agent. We will repair or replace your hardware free of charge.</p>
            </div>
        `;
        document.title = "Warranty Policy | Athletic You Nigeria";
    } else if (hash === '#/contact') {
        view.innerHTML = `
            <div class="policy-header">
                <h1>Contact Customer Support</h1>
                <p style="color: var(--text-muted); margin-top: 8px;">We are here to help. Reach our customer team directly.</p>
            </div>
            <div class="policy-content" style="max-width: 600px;">
                <p>If you have any questions regarding training setups, order tracking, payments, or warranty, please reach out via any channel below.</p>
                
                <div style="background-color: var(--card-slate); border: 1px solid var(--border-glass); padding: 24px; border-radius: 20px; margin-bottom: 32px;">
                    <h3 style="margin-top: 0; margin-bottom: 8px; color: #25D366;">WhatsApp Support</h3>
                    <p style="margin-bottom: 12px;">Immediate chats, order dispatches, custom photos.</p>
                    <a href="https://wa.me/2348126708708" target="_blank" style="color: #fff; font-weight: 700; text-decoration: none; font-size: 15px;">Chat on WhatsApp: +234 812 670 8708</a>
                </div>

                <div style="background-color: var(--card-slate); border: 1px solid var(--border-glass); padding: 24px; border-radius: 20px; margin-bottom: 32px;">
                    <h3 style="margin-top: 0; margin-bottom: 8px; color: var(--accent-purple-light);">Email Channels</h3>
                    <p style="margin-bottom: 12px;">Corporate partnerships, custom order designs, dispatches.</p>
                    <a href="mailto:support@athleticyou.com" style="color: #fff; font-weight: 700; text-decoration: none; font-size: 15px;">support@athleticyou.com</a>
                </div>
            </div>
        `;
        document.title = "Contact Support | Athletic You Nigeria";
    }
}

// ==========================================================================
// INTERACTIVE PAGE FUNCTIONALITIES
// ==========================================================================

// Category tab filter bindings
function initCategoryFilterTabs() {
    const tabs = document.querySelectorAll('.category-tabs-container .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            tabs.forEach(t => t.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            const cat = e.currentTarget.getAttribute('data-category');
            renderProductsGrid(cat);
        });
    });
}

// 3D Tilt Effect
class CardTiltEffect {
    constructor() {
        this.init();
    }
    init() {
        initTiltForElement(document);
    }
}

// Image View Click Toggler
class ProductViewToggler {
    constructor() {
        this.init();
    }
    init() {
        initProductCardToggles(document);
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
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
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

// ==========================================================================
// ENTRY INITS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Cart
    Cart = new ShoppingCart();
    
    // Render dynamic components
    renderProductsGrid();
    
    // Setup togglers & effects
    new ProductViewToggler();
    new CardTiltEffect();
    new ScrollReveal();
    initCategoryFilterTabs();
    
    // Header Scroll styles
    const header = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Setup Hash Change listener for Routing
    window.addEventListener('hashchange', handleHashRouting);
    
    // Trigger initial route
    handleHashRouting();
});
