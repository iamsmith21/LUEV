const { Client } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });


const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false,
    },
});

const usersTable = `CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(55) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(55) NOT NULL,
    lastName VARCHAR(55) NOT NULL,
    mobile VARCHAR(15) NOT NULL
);`;

const vehicleTable = `CREATE TABLE IF NOT EXISTS vehicles(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    model_year INTEGER NOT NULL,
    vehicle_type VARCHAR(20) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2),           
    mileage INT NOT NULL,
    is_used BOOLEAN NOT NULL,
    description TEXT,
    exterior_color VARCHAR(30),
    interior_color VARCHAR(30),
    interior_material VARCHAR(30),
    accident_history BOOLEAN NOT NULL,
    history_report TEXT,
    image_url TEXT,
    quantity INT NOT NULL CHECK (quantity >= 0),
    is_hot_deal BOOLEAN DEFAULT FALSE        
);
`;

const cartsTable = `
CREATE TABLE IF NOT EXISTS carts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);`;

const cartItemsTable = `
CREATE TABLE IF NOT EXISTS cart_items (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
  vehicle_id INTEGER REFERENCES vehicles(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  UNIQUE(cart_id, vehicle_id)
);`;

const ordersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  card_last_4 VARCHAR(4),
  total_amount NUMERIC(10, 2),
  created_at TIMESTAMP DEFAULT NOW()
);
`;

const orderItemsTable = `
CREATE TABLE IF NOT EXISTS order_items (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  vehicle_id INTEGER REFERENCES vehicles(id),
  vehicle_name TEXT,
  price_at_purchase NUMERIC(10, 2),
  quantity INTEGER NOT NULL CHECK (quantity > 0)
);`;

const dummyDataVehicles = `INSERT INTO vehicles (
    name, brand, model, model_year, vehicle_type, price, discount_price, mileage, is_used,
    description, exterior_color, interior_color, interior_material,
    accident_history, history_report, image_url, quantity, is_hot_deal
) VALUES
('Lucid Air', 'Lucid', 'Air', 2022, 'Sedan', 103591.82, NULL, 19302, TRUE,
 'Luxury electric driving with spacious interior and tech.',
 'Green', 'Silver', 'Leather', TRUE,
 'Minor fender bender, repairs completed with OEM parts.',
 'https://images.pexels.com/photos/18948374/pexels-photo-18948374.jpeg', 4, FALSE),

('Hyundai Kona Electric', 'Hyundai', 'Kona Electric', 2020, 'SUV', 93792.91, NULL, 18332, TRUE,
 'Compact SUV versatility with zero emissions.',
 'Grey', 'Beige', 'Leather', TRUE,
 'Minor paint scratch buffed professionally.',
 'https://images.pexels.com/photos/28500051/pexels-photo-28500051.jpeg', 6, FALSE),

('Honda e', 'Honda', 'e', 2020, 'Coupe', 95298.10, NULL, 8653, TRUE,
 'Compact electric vehicle with retro-modern design.',
 'Silver', 'Beige', 'Synthetic', TRUE,
 'Left side accident; repairs without structural damage.',
 'https://images.pexels.com/photos/32125148/pexels-photo-32125148.jpeg', 2, FALSE),

('Kia EV6', 'Kia', 'EV6', 2023, 'SUV', 30465.14, 27999.99, 8963, TRUE,
 'Cutting-edge electric SUV with advanced safety features.',
 'Beige', 'Red', 'Fabric', TRUE,
 'Minor rear bumper damage repaired professionally.',
 'https://images.pexels.com/photos/13061032/pexels-photo-13061032.jpeg', 4, TRUE),

('Tesla Model Y', 'Tesla', 'Model Y', 2021, 'Coupe', 89952.64, NULL, 13386, TRUE,
 'Versatile electric SUV with advanced driver-assistance.',
 'Blue', 'Red', 'Fabric', TRUE,
 'Minor windshield chip repaired under warranty.',
 'https://images.pexels.com/photos/30306584/pexels-photo-30306584.jpeg', 5, FALSE),

('Nissan Leaf', 'Nissan', 'Leaf', 2022, 'Sedan', 106642.55, NULL, 14037, TRUE,
 'Reliable and efficient electric vehicle.',
 'Red', 'White', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/29248663/pexels-photo-29248663.jpeg', 5, FALSE),

('Tesla Model S', 'Tesla', 'Model S', 2023, 'Sedan', 48788.77, 45999.99, 4293, TRUE,
 'Premium electric sedan with incredible acceleration and autopilot.',
 'Beige', 'Blue', 'Synthetic', TRUE,
 'Windshield glass scratch replaced under warranty.',
 'https://images.pexels.com/photos/28123191/pexels-photo-28123191.jpeg', 6, TRUE),

('Polestar 2', 'Polestar', '2', 2023, 'Sedan', 41440.23, NULL, 16180, TRUE,
 'Scandinavian design with powerful electric performance.',
 'Silver', 'Blue', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/15691825/pexels-photo-15691825.jpeg', 5, FALSE),

('Jaguar I-PACE', 'Jaguar', 'I-PACE', 2024, 'SUV', 109220.30, NULL, 3260, TRUE,
 'Luxury electric SUV with sporty handling.',
 'Green', 'Red', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/189454/pexels-photo-189454.jpeg', 1, FALSE),

('Ford F-150 Lightning', 'Ford', 'F-150 Lightning', 2022, 'Pickup', 107810.13, NULL, 17081, TRUE,
 'Electric pickup combining power with rugged design.',
 'Beige', 'Blue', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/2791685/pexels-photo-2791685.jpeg', 1, FALSE),

('Tesla Model X', 'Tesla', 'Model X', 2021, 'SUV', 61467.73, 58999.99, 8832, TRUE,
 'Electric SUV with falcon-wing doors and spacious interior.',
 'Black', 'Green', 'Leather', TRUE,
 'Minor front bumper scrape; replaced bumper assembly.',
 'https://images.pexels.com/photos/28772164/pexels-photo-28772164.jpeg', 9, TRUE),

('Chrysler Pacifica Hybrid', 'Chrysler', 'Pacifica Hybrid', 2023, 'Minivan', 110329.34, NULL, 11379, TRUE,
 'Family-friendly plug-in hybrid minivan.',
 'Black', 'White', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/13784417/pexels-photo-13784417.jpeg', 10, FALSE),

('BMW i4 M50', 'BMW', 'i4 M50', 2023, 'Sedan', 116573.00, NULL, 15820, TRUE,
 'Sporty performance luxury electric sedan.',
 'Beige', 'Blue', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/93615/pexels-photo-93615.jpeg', 9, FALSE),

('Chevrolet Silverado EV', 'Chevrolet', 'Silverado EV', 2023, 'Pickup', 40479.73, 37999.99, 11655, TRUE,
 'Rugged electric pickup with strong towing capability.',
 'Red', 'Red', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/9115472/pexels-photo-9115472.jpeg', 8, TRUE),

('BMW i3', 'BMW', 'i3', 2020, 'Hatchback', 89795.21, NULL, 12641, TRUE,
 'Compact electric hatchback focused on urban mobility.',
 'Silver', 'Red', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/17000828/pexels-photo-17000828.jpeg', 6, FALSE),

('Lucid Gravity', 'Lucid', 'Gravity', 2024, 'SUV', 85000.00, 82000.00, 3000, TRUE,
 'Upcoming luxury electric SUV with cutting-edge tech.',
 'Black', 'White', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/2791685/pexels-photo-2791685.jpeg', 3, FALSE),

('Mazda CX-30 EV', 'Mazda', 'CX-30 EV', 2023, 'SUV', 37000.00, 35000.00, 9000, TRUE,
 'Electric compact SUV with stylish design.',
 'Grey', 'Beige', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/26224702/pexels-photo-26224702.jpeg', 5, FALSE),

('Audi e-tron', 'Audi', 'e-tron', 2021, 'SUV', 77280.94, NULL, 17471, TRUE,
 'Premium electric SUV with high-quality interiors.',
 'Red', 'Red', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg', 10, TRUE),

('Nissan Ariya', 'Nissan', 'Ariya', 2023, 'SUV', 45000.00, NULL, 8000, TRUE,
 'Electric crossover with smooth ride and tech.',
 'White', 'Grey', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/17000828/pexels-photo-17000828.jpeg', 6, FALSE),

('Polestar 3', 'Polestar', '3', 2023, 'SUV', 62000.00, NULL, 5000, TRUE,
 'Luxury electric SUV with performance focus.',
 'Blue', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/93615/pexels-photo-93615.jpeg', 8, FALSE),

('Audi Q5 e', 'Audi', 'Q5 e', 2024, 'SUV', 55000.00, 52000.00, 4000, TRUE,
 'Electric SUV with comfortable interiors and smooth drive.',
 'White', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/20220997/pexels-photo-20220997.jpeg', 7, TRUE),

('Porsche Macan EV', 'Porsche', 'Macan EV', 2024, 'SUV', 70000.00, NULL, 2000, TRUE,
 'Upcoming electric SUV with sporty handling.',
 'Red', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/30889575/pexels-photo-30889575.jpeg', 4, FALSE),

('Volkswagen e-Golf', 'Volkswagen', 'e-Golf', 2020, 'Hatchback', 30000.00, NULL, 25000, TRUE,
 'Electric hatchback with smooth city driving.',
 'Blue', 'Grey', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg', 9, FALSE),

('BMW iX3', 'BMW', 'iX3', 2021, 'SUV', 48000.00, NULL, 17000, TRUE,
 'Electric SUV with sporty design and range.',
 'Black', 'Red', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', 8, FALSE),

('BMW iX', 'BMW', 'iX', 2023, 'SUV', 81000.00, 79000.00, 3000, TRUE,
 'Electric SUV with innovative technology and long range.',
 'Blue', 'Grey', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', 6, TRUE),

('Chevrolet Bolt EV', 'Chevrolet', 'Bolt EV', 2021, 'Hatchback', 37000.00, NULL, 12000, TRUE,
 'Affordable electric hatchback with efficiency.',
 'Red', 'Black', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/6698127/pexels-photo-6698127.jpeg', 7, FALSE),

('Honda Insight', 'Honda', 'Insight', 2020, 'Sedan', 25000.00, NULL, 20000, TRUE,
 'Hybrid sedan with excellent fuel economy.',
 'Grey', 'Beige', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/6894420/pexels-photo-6894420.jpeg', 5, FALSE),

('Ford Mustang Mach-E', 'Ford', 'Mustang Mach-E', 2023, 'SUV', 55000.00, 49999.99, 5000, TRUE,
 'Electric SUV with sporty styling and strong performance.',
 'Blue', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/3065602/pexels-photo-3065602.jpeg', 8, TRUE),

('Audi Q3 e', 'Audi', 'Q3 e', 2023, 'SUV', 47000.00, 45000.00, 7000, TRUE,
 'Compact luxury electric SUV with advanced safety.',
 'White', 'Grey', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg', 6, FALSE),

('Tesla Cybertruck', 'Tesla', 'Cybertruck', 2024, 'Pickup', 69999.99, NULL, 1200, FALSE,
 'Futuristic electric pickup with impressive durability and range.',
 'Silver', 'Black', 'Synthetic', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/2791685/pexels-photo-2791685.jpeg', 12, TRUE),

('Hyundai Ioniq 5', 'Hyundai', 'Ioniq 5', 2023, 'SUV', 45000.00, 43000.00, 8500, TRUE,
 'Stylish electric SUV with fast charging and roomy interior.',
 'Blue', 'White', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/28500051/pexels-photo-28500051.jpeg', 7, FALSE),

('Mazda MX-5 EV', 'Mazda', 'MX-5 EV', 2022, 'Coupe', 39000.00, NULL, 15000, TRUE,
 'Electric version of the popular MX-5 roadster, sporty and fun.',
 'Red', 'Black', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/18926044/pexels-photo-18926044.jpeg', 3, FALSE),

('BMW X1 EV', 'BMW', 'X1 EV', 2023, 'SUV', 52000.00, 50000.00, 7000, TRUE,
 'Compact electric SUV with premium features.',
 'Black', 'Beige', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg', 5, FALSE),

('Chevrolet Equinox EV', 'Chevrolet', 'Equinox EV', 2023, 'SUV', 35000.00, 33000.00, 9500, TRUE,
 'Affordable electric SUV with good range and tech.',
 'Grey', 'Black', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/9115472/pexels-photo-9115472.jpeg', 6, TRUE),

('Polestar 1', 'Polestar', '1', 2022, 'Coupe', 120000.00, NULL, 5000, TRUE,
 'Luxury plug-in hybrid coupe with high performance.',
 'White', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/15691825/pexels-photo-15691825.jpeg', 2, FALSE),

('Ford Mustang EV', 'Ford', 'Mustang EV', 2023, 'Coupe', 48000.00, NULL, 3000, FALSE,
 'Electric version of the iconic Mustang with sporty design.',
 'Red', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/2791685/pexels-photo-2791685.jpeg', 4, FALSE),

('Volkswagen ID. Buzz', 'Volkswagen', 'ID. Buzz', 2024, 'Minivan', 60000.00, NULL, 1200, FALSE,
 'Electric minivan with spacious interior and modern tech.',
 'Blue', 'Grey', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/5822365/pexels-photo-5822365.jpeg', 7, TRUE),

('Audi A6 e-tron', 'Audi', 'A6 e-tron', 2023, 'Sedan', 70000.00, 68000.00, 3000, TRUE,
 'Electric luxury sedan with great range and technology.',
 'Black', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg', 5, FALSE),

('Tesla Roadster', 'Tesla', 'Roadster', 2024, 'Coupe', 200000.00, NULL, 500, FALSE,
 'High-performance electric sports car with stunning acceleration.',
 'Red', 'Black', 'Leather', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/28123191/pexels-photo-28123191.jpeg', 3, TRUE),

('Honda Clarity EV', 'Honda', 'Clarity EV', 2023, 'Sedan', 37000.00, NULL, 8000, TRUE,
 'Electric sedan with great efficiency and comfort.',
 'White', 'Beige', 'Fabric', FALSE,
 'No accidents reported.',
 'https://images.pexels.com/photos/32125148/pexels-photo-32125148.jpeg', 6, FALSE);
`;

const customizationOptionsTable = `
CREATE TABLE IF NOT EXISTS customization_options (
  id SERIAL PRIMARY KEY,
  option_name VARCHAR(100) NOT NULL,
  additional_cost NUMERIC(10, 2) DEFAULT 0.00
);
`;

const selectedCustomizationsTable = `
CREATE TABLE IF NOT EXISTS selected_customizations (
  id SERIAL PRIMARY KEY,
  order_item_id INTEGER REFERENCES order_items(id) ON DELETE CASCADE,
  customization_option_id INTEGER REFERENCES customization_options(id)
);
`;

const cartItemCustomizations = `CREATE TABLE IF NOT EXISTS cart_item_customizations (
  id SERIAL PRIMARY KEY,
  cart_item_id INTEGER REFERENCES cart_items(id) ON DELETE CASCADE,
  customization_option_id INTEGER REFERENCES customization_options(id),
  UNIQUE(cart_item_id, customization_option_id)
);
`;

const vehicleReviewsTable = `
CREATE TABLE IF NOT EXISTS vehicle_reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, vehicle_id)
);
`;
const dummyCustomizationOptions = `
INSERT INTO customization_options (option_name, additional_cost) VALUES
  ('Sunroof',  1200.00),
  ('Premium Sound System',  800.00),
  ('Sport Wheels',  1500.00),
  ('All-Weather Floor Mats', 150.00),
  ('Extended Warranty',  900.00),
  ('Carbon Fiber Trim',  700.00),
  ('Roof Rack',  400.00),
  ('Heated Seats', 500.00)
ON CONFLICT DO NOTHING;
`;

async function main() {
  try {
    console.log("Using DB URL:", process.env.DATABASE_URL);

    await client.connect();
    const res = await client.query("SELECT current_database()");
    console.log("Connected to database:", res.rows[0].current_database);
    await client.query(usersTable);
    await client.query(vehicleTable);
    await client.query(cartsTable);
    await client.query(cartItemsTable);
    await client.query(ordersTable);
    await client.query(orderItemsTable);
    await client.query(customizationOptionsTable);
    await client.query(selectedCustomizationsTable);
    await client.query(vehicleReviewsTable);
    await client.query(cartItemCustomizations);
     await client.query(dummyCustomizationOptions);
    await client.query(dummyDataVehicles);
    console.log("tables created successfully");
  } catch (error) {
    console.log("error", error);
  } finally {
    await client.end();
  }
}

main();
