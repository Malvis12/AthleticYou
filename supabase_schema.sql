-- ==============================================================================
-- ATHLETIC YOU - SUPABASE DATABASE INITIALIZATION SCHEMA
-- Run this complete SQL script in your Supabase Project -> SQL Editor
-- ==============================================================================

-- 1. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  price NUMERIC NOT NULL,
  image_url TEXT,
  badge TEXT,
  short_description TEXT,
  description TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CUSTOMER ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_number TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state_code TEXT NOT NULL,
  state_name TEXT NOT NULL,
  delivery_notes TEXT,
  payment_method TEXT NOT NULL,
  items JSONB NOT NULL,
  subtotal NUMERIC NOT NULL,
  shipping_fee NUMERIC NOT NULL,
  grand_total NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS store_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  store_name TEXT NOT NULL DEFAULT 'Athletic You',
  tagline TEXT NOT NULL DEFAULT 'Workout Simplified',
  whatsapp_number TEXT NOT NULL DEFAULT '2348126708708',
  support_email TEXT NOT NULL DEFAULT 'support@athleticyou.com',
  bank_name TEXT NOT NULL DEFAULT 'Zenith Bank PLC',
  account_name TEXT NOT NULL DEFAULT 'ATHLETIC YOU FITNESS NIG LTD',
  account_number TEXT NOT NULL DEFAULT '1229048590',
  hero_headline TEXT NOT NULL DEFAULT 'ATHLETIC YOU',
  hero_subheadline TEXT NOT NULL DEFAULT 'WORKOUT SIMPLIFIED.',
  hero_subtitle TEXT NOT NULL DEFAULT 'Build a serious training environment anywhere. Premium fitness equipment designed for people who want effective training without building their lives around the gym.',
  hero_image_url TEXT DEFAULT '/Dumbbell.jpg',
  marquee_texts JSONB DEFAULT '["WORKOUT SIMPLIFIED", "FAST NATIONWIDE NIGERIAN DELIVERY", "SOLID CAST-IRON HARDWARE", "PREMIUM TRAINING SYSTEMS", "ZERO COMMUTE • TRAIN AT HOME", "ENGINEERED FOR REAL SPACES"]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. SHIPPING RATES TABLE
CREATE TABLE IF NOT EXISTS shipping_rates (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  fee NUMERIC NOT NULL,
  delivery_days TEXT NOT NULL
);

-- ==============================================================================
-- ENABLE PUBLIC READ & WRITE POLICIES (Row Level Security)
-- ==============================================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on products" ON products;
DROP POLICY IF EXISTS "Allow public write on products" ON products;
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public write on products" ON products FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on orders" ON orders;
DROP POLICY IF EXISTS "Allow public write on orders" ON orders;
CREATE POLICY "Allow public read on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public write on orders" ON orders FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on store_settings" ON store_settings;
DROP POLICY IF EXISTS "Allow public write on store_settings" ON store_settings;
CREATE POLICY "Allow public read on store_settings" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Allow public write on store_settings" ON store_settings FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on shipping_rates" ON shipping_rates;
DROP POLICY IF EXISTS "Allow public write on shipping_rates" ON shipping_rates;
CREATE POLICY "Allow public read on shipping_rates" ON shipping_rates FOR SELECT USING (true);
CREATE POLICY "Allow public write on shipping_rates" ON shipping_rates FOR ALL USING (true);

-- ==============================================================================
-- SEED EXACT ATHLETIC YOU PRODUCTS & STORE DATA
-- ==============================================================================

-- 1. Store Settings
INSERT INTO store_settings (id, store_name, tagline, whatsapp_number, support_email, bank_name, account_name, account_number, hero_headline, hero_subheadline, hero_subtitle, hero_image_url)
VALUES (
  'default',
  'Athletic You',
  'Workout Simplified',
  '2348126708708',
  'support@athleticyou.com',
  'Zenith Bank PLC',
  'ATHLETIC YOU FITNESS NIG LTD',
  '1229048590',
  'ATHLETIC YOU',
  'WORKOUT SIMPLIFIED.',
  'Build a serious training environment anywhere. Premium fitness equipment designed for people who want effective training without building their lives around the gym.',
  '/Dumbbell.jpg'
)
ON CONFLICT (id) DO UPDATE SET
  store_name = EXCLUDED.store_name,
  tagline = EXCLUDED.tagline,
  whatsapp_number = EXCLUDED.whatsapp_number,
  support_email = EXCLUDED.support_email,
  bank_name = EXCLUDED.bank_name,
  account_name = EXCLUDED.account_name,
  account_number = EXCLUDED.account_number,
  hero_headline = EXCLUDED.hero_headline,
  hero_subheadline = EXCLUDED.hero_subheadline,
  hero_subtitle = EXCLUDED.hero_subtitle,
  hero_image_url = EXCLUDED.hero_image_url;

-- 2. Exact Products from Catalog
INSERT INTO products (id, name, slug, category, subcategory, price, image_url, badge, short_description, description, in_stock) VALUES
('p1', 'Dumbbells', 'dumbbells', 'STRENGTH', 'Weights', 180000, '/Dumbbell.jpg', 'Bestseller', 'Solid cast-iron dumbbells with knurled handles for a secure grip.', 'Solid cast-iron dumbbells with knurled handles for a secure grip. Designed to fit in any home strength routine without the clutter of traditional iron plates.', true),
('p2', 'Kettlebells', 'kettlebells', 'STRENGTH', 'Weights', 120000, 'https://images.pexels.com/photos/13863727/pexels-photo-13863727.jpeg?auto=compress&cs=tinysrgb&w=800', 'High Demand', 'Cast iron kettlebells with wide handles for swings and squats.', 'Cast iron kettlebells with wide handles for swings and squats. Ergonomically engineered for full-body dynamic conditioning.', true),
('p3', 'Resistance Bands', 'resistance-bands', 'FOUNDATION', 'Accessories', 35000, 'https://images.pexels.com/photos/19330505/pexels-photo-19330505.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Durable elastic bands for stretching and strength training.', 'Durable elastic bands for stretching and strength training. Multi-layered natural latex loop construction for progressive overload and mobility work.', true),
('p4', 'Jump Rope', 'jump-rope', 'FOUNDATION', 'Accessories', 15000, 'https://images.pexels.com/photos/8478702/pexels-photo-8478702.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Adjustable speed jump rope for conditioning and cardio training.', 'Adjustable speed jump rope for conditioning and cardio training. Smooth 360-degree ball bearings in the handles for effortless rotations.', true),
('p5', 'Yoga Mat', 'yoga-mat', 'FOUNDATION', 'Floor Mats', 45000, 'https://images.pexels.com/photos/4325462/pexels-photo-4325462.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Thick, non-slip textured yoga mat for joint cushioning and comfort.', 'Thick, non-slip textured yoga mat for joint cushioning and comfort. Supreme floor traction, high stability for balances, and moisture resistance.', true),
('p6', 'Ab Roller', 'ab-roller', 'FOUNDATION', 'Core', 20000, 'https://images.pexels.com/photos/8033019/pexels-photo-8033019.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Wide wheel ab roller with soft foam handles for core exercises.', 'Wide wheel ab roller with soft foam handles for core exercises. Built with internal resistance mechanisms to build deep core strength safely.', true),
('p7', 'Exercise Ball', 'exercise-ball', 'FOUNDATION', 'Stability', 25000, 'https://images.pexels.com/photos/32610335/pexels-photo-32610335.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Durable stability ball for core strengthening and flexibility training.', 'Durable stability ball for core strengthening and flexibility training. Gym-grade anti-burst construction rated up to 2000 lbs.', true),
('p8', 'Pull-Up Bar', 'pull-up-bar', 'FOUNDATION', 'Bodyweight', 60000, 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRkCM6ecPwkdXQW_AhZUAKupifnPGX2NdHZrlrifPDG5Ysa2IhSbxjP79MCW60j28LPF56l8-lNKdSDFb2OE_h0vY83zYuLuLifauEU2e0&usqp=CAc', NULL, 'Heavy-duty door frame bar with multiple padded grip handles.', 'Heavy-duty door frame bar with multiple padded grip handles. Utilizes leverage physics—no screws or drilling required.', true),
('p9', 'Treadmill', 'treadmill', 'PERFORMANCE', 'Cardio', 85000, 'https://images.pexels.com/photos/5411023/pexels-photo-5411023.jpeg?auto=compress&cs=tinysrgb&w=800', 'Flagship', 'Foldable running treadmill with adjustable speed and built-in screen.', 'Foldable running treadmill with adjustable speed and built-in screen. Ultra-thin fold-flat engineering with silent brushless motor.', true),
('p10', 'Adjustable Weight Bench', 'adjustable-weight-bench', 'STRENGTH', 'Weights', 220000, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnA9NFP_ZdbENITN9dp8EQeEU_piVWb8XLdw5XIrB-A&s=10', NULL, 'Adjustable weight bench for flat, incline, and decline training.', 'Adjustable weight bench for flat, incline, and decline training. Features high-density sweatproof padding and folds completely flat for minimal footprint storage.', true),
('p11', 'Barbell and Weight Plates', 'barbell-and-weight-plates', 'STRENGTH', 'Weights', 380000, 'https://images.pexels.com/photos/7811528/pexels-photo-7811528.jpeg?auto=compress&cs=tinysrgb&w=800', 'Heavy Duty', 'Solid steel weight bar complete with secure spring collar locks and plates.', 'Solid steel weight bar complete with secure spring collar locks and plates. The foundational setup for squats, bench pressing, and deadlifts.', true),
('p12', 'Core Sliders', 'core-sliders', 'PERFORMANCE', 'Core', 12000, '/assets/sliders_front.svg', NULL, 'Double-sided sliding discs for low-impact core training workouts.', 'Double-sided sliding discs for low-impact core training workouts. Glides smoothly on carpets, tiles, or hardwood floors.', true),
('p13', 'Suspension Trainer', 'suspension-trainer', 'PERFORMANCE', 'Bodyweight', 85000, 'https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Adjustable straps and anchors for full-body resistance exercises.', 'Adjustable straps and anchors for full-body resistance exercises. Sets up in seconds on doors, poles, or beams for complete training anywhere.', true),
('p14', 'Punching Bag and Gloves', 'punching-bag-and-gloves', 'PERFORMANCE', 'Boxing', 150000, 'https://images.pexels.com/photos/6296105/pexels-photo-6296105.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Hanging heavy punching bag paired with padded boxing gloves.', 'Hanging heavy punching bag paired with padded boxing gloves. Complete heavy-bag boxing setup for cardio and power conditioning.', true),
('p15', 'Medicine Ball', 'medicine-ball', 'PERFORMANCE', 'Weights', 55000, 'https://images.pexels.com/photos/4720565/pexels-photo-4720565.jpeg?auto=compress&cs=tinysrgb&w=800', NULL, 'Heavy medicine ball for explosive movements and functional training.', 'Heavy medicine ball for explosive movements and functional training. Scuff-resistant textured rubber surface enables active slamming and rotational throws.', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  price = EXCLUDED.price,
  image_url = EXCLUDED.image_url,
  badge = EXCLUDED.badge,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  in_stock = EXCLUDED.in_stock;

-- 3. Initial Nigerian States Shipping Rates
INSERT INTO shipping_rates (code, name, fee, delivery_days) VALUES
('LA', 'Lagos (Priority Express)', 3500, '1 - 2 business days'),
('AB', 'Abuja (FCT)', 5500, '2 - 3 business days'),
('RI', 'Rivers (Port Harcourt)', 6000, '2 - 4 business days'),
('OY', 'Oyo (Ibadan)', 4500, '2 - 3 business days'),
('OG', 'Ogun (Abeokuta)', 4000, '1 - 2 business days'),
('ED', 'Edo (Benin City)', 6500, '3 - 4 business days'),
('DE', 'Delta (Asaba / Warri)', 6500, '3 - 4 business days'),
('AN', 'Anambra (Onitsha / Awka)', 6000, '3 - 4 business days'),
('EN', 'Enugu (Enugu City)', 6000, '3 - 4 business days'),
('KN', 'Kano (Kano City)', 7500, '3 - 5 business days'),
('KD', 'Kaduna (Kaduna City)', 7000, '3 - 5 business days'),
('PL', 'Plateau (Jos)', 7000, '3 - 5 business days'),
('KW', 'Kwara (Ilorin)', 5500, '2 - 3 business days'),
('OS', 'Osun (Osogbo)', 5000, '2 - 3 business days'),
('ON', 'Ondo (Akure)', 5500, '2 - 3 business days'),
('EK', 'Ekiti (Ado-Ekiti)', 5500, '2 - 3 business days'),
('CR', 'Cross River (Calabar)', 7000, '3 - 5 business days'),
('AK', 'Akwa Ibom (Uyo)', 7000, '3 - 5 business days'),
('IM', 'Imo (Owerri)', 6500, '3 - 4 business days'),
('ABIA', 'Abia (Umuahia / Aba)', 6500, '3 - 4 business days'),
('EB', 'Ebonyi (Abakaliki)', 7000, '3 - 5 business days'),
('BA', 'Bauchi', 7500, '3 - 5 business days'),
('BE', 'Benue (Makurdi)', 6500, '3 - 4 business days'),
('BO', 'Borno (Maiduguri)', 8500, '4 - 6 business days'),
('GO', 'Gombe', 8000, '4 - 6 business days'),
('JI', 'Jigawa (Dutse)', 8000, '4 - 6 business days'),
('KT', 'Katsina', 8000, '4 - 6 business days'),
('KE', 'Kebbi (Birnin Kebbi)', 8500, '4 - 6 business days'),
('KO', 'Kogi (Lokoja)', 6000, '2 - 4 business days'),
('NA', 'Nasarawa (Lafia)', 6000, '2 - 4 business days'),
('NI', 'Niger (Minna)', 6000, '2 - 4 business days'),
('SO', 'Sokoto', 8500, '4 - 6 business days'),
('TA', 'Taraba (Jalingo)', 8500, '4 - 6 business days'),
('YO', 'Yobe (Damaturu)', 8500, '4 - 6 business days'),
('ZA', 'Zamfara (Gusau)', 8500, '4 - 6 business days'),
('AD', 'Adamawa (Yola)', 8500, '4 - 6 business days'),
('BY', 'Bayelsa (Yenagoa)', 7000, '3 - 5 business days')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  fee = EXCLUDED.fee,
  delivery_days = EXCLUDED.delivery_days;
