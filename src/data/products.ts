import { Product } from '../types/product';

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Dumbbells",
    slug: "dumbbells",
    category: "STRENGTH",
    subcategory: "Weights",
    price: 180000,
    compareAtPrice: 220000,
    images: {
      primary: "/Dumbbell.jpg",
      secondary: "/AY.jpg"
    },
    rating: 4.9,
    reviewCount: 38,
    badge: "Bestseller",
    description: "Solid cast-iron dumbbells with knurled handles for a secure grip. Designed to fit in any home strength routine without the clutter of traditional iron plates.",
    shortDescription: "Solid cast-iron dumbbells with knurled handles for a secure grip.",
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
    name: "Kettlebells",
    slug: "kettlebells",
    category: "STRENGTH",
    subcategory: "Weights",
    price: 120000,
    compareAtPrice: 150000,
    images: {
      primary: "https://images.pexels.com/photos/13863727/pexels-photo-13863727.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/kettlebell_detail.svg"
    },
    rating: 4.8,
    reviewCount: 22,
    badge: "High Demand",
    description: "Cast iron kettlebells with wide handles for swings and squats. Ergonomically engineered for full-body dynamic conditioning.",
    shortDescription: "Cast iron kettlebells with wide handles for swings and squats.",
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
      "1x 16kg Kettlebell",
      "1x Kettlebell Conditioning Routine Guide"
    ],
    variants: ["16kg", "24kg (+₦35,000)"]
  },
  {
    id: "p3",
    name: "Resistance Bands",
    slug: "resistance-bands",
    category: "FOUNDATION",
    subcategory: "Accessories",
    price: 35000,
    compareAtPrice: 45000,
    images: {
      primary: "https://images.pexels.com/photos/19330505/pexels-photo-19330505.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/bands_detail.svg"
    },
    rating: 4.7,
    reviewCount: 45,
    description: "Durable elastic bands for stretching and strength training. Multi-layered natural latex loop construction for progressive overload and mobility work.",
    shortDescription: "Durable elastic bands for stretching and strength training.",
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
    name: "Jump Rope",
    slug: "jump-rope",
    category: "FOUNDATION",
    subcategory: "Accessories",
    price: 15000,
    compareAtPrice: 20000,
    images: {
      primary: "https://images.pexels.com/photos/8478702/pexels-photo-8478702.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/jumprope_detail.svg"
    },
    rating: 4.9,
    reviewCount: 64,
    description: "Adjustable speed jump rope for conditioning and cardio training. Smooth 360-degree ball bearings in the handles for effortless rotations.",
    shortDescription: "Adjustable speed jump rope for conditioning and cardio training.",
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
      "1x Speed Jump Rope Assembly",
      "1x Spare Steel Cable",
      "2x Cable Protection Tubes",
      "1x Travel pouch"
    ],
    variants: ["Stealth Black", "Carbon Gray"]
  },
  {
    id: "p5",
    name: "Yoga Mat",
    slug: "yoga-mat",
    category: "FOUNDATION",
    subcategory: "Floor Mats",
    price: 45000,
    compareAtPrice: 55000,
    images: {
      primary: "https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/yogamat_detail.svg"
    },
    rating: 4.8,
    reviewCount: 31,
    description: "Thick, non-slip textured yoga mat for joint cushioning and comfort. Supreme floor traction, high stability for balances, and moisture resistance.",
    shortDescription: "Thick, non-slip textured yoga mat for joint cushioning and comfort.",
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
      "1x High-Density Exercise Mat",
      "1x Heavy-Duty Elastic Carry Strap",
      "1x Clean & Maintenance Guide"
    ],
    variants: ["Onyx Black", "Stealth Navy"]
  },
  {
    id: "p6",
    name: "Ab Roller",
    slug: "ab-roller",
    category: "FOUNDATION",
    subcategory: "Core",
    price: 20000,
    compareAtPrice: 25000,
    images: {
      primary: "https://images.pexels.com/photos/8033019/pexels-photo-8033019.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/abroller_detail.svg"
    },
    rating: 4.6,
    reviewCount: 19,
    description: "Wide wheel ab roller with soft foam handles for core exercises. Built with internal resistance mechanisms to build deep core strength safely.",
    shortDescription: "Wide wheel ab roller with soft foam handles for core exercises.",
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
    name: "Exercise Ball",
    slug: "exercise-ball",
    category: "FOUNDATION",
    subcategory: "Stability",
    price: 25000,
    compareAtPrice: 30000,
    images: {
      primary: "https://images.pexels.com/photos/32610335/pexels-photo-32610335.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/sliders_detail.svg"
    },
    rating: 4.7,
    reviewCount: 15,
    description: "Durable stability ball for core strengthening and flexibility training. Gym-grade anti-burst construction rated up to 2000 lbs.",
    shortDescription: "Durable stability ball for core strengthening and flexibility training.",
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
      "1x Gym-Grade Exercise Ball",
      "1x Double-Action Foot Pump",
      "2x Air Plugs",
      "1x Plug Removal Tool"
    ],
    variants: ["65cm Onyx"]
  },
  {
    id: "p8",
    name: "Pull-Up Bar",
    slug: "pull-up-bar",
    category: "FOUNDATION",
    subcategory: "Bodyweight",
    price: 60000,
    compareAtPrice: 75000,
    images: {
      primary: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkCM6ecPwkdXQW_AhZUAKupifnPGX2NdHZrlrifPDG5Ysa2IhSbxjP79MCW60j28LPF56l8-lNKdSDFb2OE_h0vY83zYuLuLifauEU2e0&usqp=CAc",
      secondary: "/assets/pullup_detail.svg"
    },
    rating: 4.8,
    reviewCount: 29,
    description: "Heavy-duty door frame bar with multiple padded grip handles. Utilizes leverage physics—no screws or drilling required.",
    shortDescription: "Heavy-duty door frame bar with multiple padded grip handles.",
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
      "1x Heavy-Duty Pull-Up Bar Assembly",
      "2x Wedge Guard Protectors",
      "1x Hex Bolt Hardware Toolset"
    ],
    variants: ["Standard Leverage"]
  },
  {
    id: "p9",
    name: "Treadmill",
    slug: "treadmill",
    category: "PERFORMANCE",
    subcategory: "Cardio",
    price: 850000,
    compareAtPrice: 950000,
    images: {
      primary: "https://images.pexels.com/photos/5411023/pexels-photo-5411023.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/treadmill_detail.svg"
    },
    rating: 4.9,
    reviewCount: 11,
    badge: "Flagship",
    description: "Foldable running treadmill with adjustable speed and built-in screen. Ultra-thin fold-flat engineering with silent brushless motor.",
    shortDescription: "Foldable running treadmill with adjustable speed and built-in screen.",
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
      "1x Folding Running Treadmill",
      "1x Smart Safety Key",
      "1x Wireless Remote Control",
      "1x Lubricating Oil Tube",
      "1x Toolkit"
    ],
    variants: ["Standard Edition"]
  },
  {
    id: "p10",
    name: "Adjustable Weight Bench",
    slug: "adjustable-weight-bench",
    category: "STRENGTH",
    subcategory: "Weights",
    price: 220000,
    compareAtPrice: 260000,
    images: {
      primary: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnA9NFP_ZdbENITN9dp8EQeEU_piVWb8XLdw5XIrB-A&s=10",
      secondary: "/assets/bench_detail.svg"
    },
    rating: 4.8,
    reviewCount: 18,
    description: "Adjustable weight bench for flat, incline, and decline training. Features high-density sweatproof padding and folds completely flat for minimal footprint storage.",
    shortDescription: "Adjustable weight bench for flat, incline, and decline training.",
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
    name: "Barbell and Weight Plates",
    slug: "barbell-and-weight-plates",
    category: "STRENGTH",
    subcategory: "Weights",
    price: 380000,
    compareAtPrice: 430000,
    images: {
      primary: "https://images.pexels.com/photos/7811528/pexels-photo-7811528.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/barbell_detail.svg"
    },
    rating: 4.9,
    reviewCount: 14,
    badge: "Heavy Duty",
    description: "Solid steel weight bar complete with secure spring collar locks and plates. The foundational setup for squats, bench pressing, and deadlifts.",
    shortDescription: "Solid steel weight bar complete with secure spring collar locks and plates.",
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
    name: "Core Sliders",
    slug: "core-sliders",
    category: "PERFORMANCE",
    subcategory: "Core",
    price: 12000,
    compareAtPrice: 15000,
    images: {
      primary: "/assets/sliders_front.svg",
      secondary: "/assets/sliders_detail.svg"
    },
    rating: 4.5,
    reviewCount: 20,
    description: "Double-sided sliding discs for low-impact core training workouts. Glides smoothly on carpets, tiles, or hardwood floors.",
    shortDescription: "Double-sided sliding discs for low-impact core training workouts.",
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
    name: "Suspension Trainer",
    slug: "suspension-trainer",
    category: "PERFORMANCE",
    subcategory: "Bodyweight",
    price: 85000,
    compareAtPrice: 100000,
    images: {
      primary: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/suspension_detail.svg"
    },
    rating: 4.8,
    reviewCount: 25,
    description: "Adjustable straps and anchors for full-body resistance exercises. Sets up in seconds on doors, poles, or beams for complete training anywhere.",
    shortDescription: "Adjustable straps and anchors for full-body resistance exercises.",
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
    name: "Punching Bag and Gloves",
    slug: "punching-bag-and-gloves",
    category: "PERFORMANCE",
    subcategory: "Boxing",
    price: 150000,
    compareAtPrice: 180000,
    images: {
      primary: "https://images.pexels.com/photos/6296105/pexels-photo-6296105.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/boxing_detail.svg"
    },
    rating: 4.7,
    reviewCount: 16,
    description: "Hanging heavy punching bag paired with padded boxing gloves. Complete heavy-bag boxing setup for cardio and power conditioning.",
    shortDescription: "Hanging heavy punching bag paired with padded boxing gloves.",
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
    name: "Medicine Ball",
    slug: "medicine-ball",
    category: "PERFORMANCE",
    subcategory: "Weights",
    price: 55000,
    compareAtPrice: 65000,
    images: {
      primary: "https://images.pexels.com/photos/4720565/pexels-photo-4720565.jpeg?auto=compress&cs=tinysrgb&w=800",
      secondary: "/assets/kettlebell_detail.svg"
    },
    rating: 4.8,
    reviewCount: 23,
    description: "Heavy medicine ball for explosive movements and functional training. Scuff-resistant textured rubber surface enables active slamming and rotational throws.",
    shortDescription: "Heavy medicine ball for explosive movements and functional training.",
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
      "1x 8kg Medicine Ball",
      "1x Power Slam Workout Manual"
    ],
    variants: ["8kg Ball", "12kg Ball (+₦18,000)"]
  }
];
